import express, { Express } from 'express';
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import * as  OpenApiValidator from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import cors from 'cors';
import { SQLessConfig } from './SQLessConfig';
import { MethodDelegate } from '../delegate/MethodDelegate';
import _ from 'lodash';
import { WellKnown, JWK, discover, getJWKs } from '../service/oidc-discovery/OIDCDiscovery';
import passport from 'passport';
import multer from 'multer';
import stream from 'stream';

// tslint:disable-next-line:no-var-requires
const jwksClient = require('jwks-rsa');
// tslint:disable-next-line:no-var-requires
const JwtStrategy = require('passport-jwt').Strategy;
// tslint:disable-next-line:no-var-requires
const ExtractJwt = require('passport-jwt').ExtractJwt;

export class SQLess {

    app: Express;
    constructor(private context: any) { }

    start(host: string, port: number): void {
        console.log('Starting Express server');
        this.app = express();

        this.app.use(bodyParser.json())


        // start the express server
        this.app.listen(port, host, () => {
            // tslint:disable-next-line:no-console
            console.log(`server started at http://${host}:${port}`);
        });
    }


    async addAPI(tenant: string, config: SQLessConfig, api: OpenAPIV3.Document, methodExecutors: { [path: string]: { [method: string]: MethodDelegate } }): Promise<void> {
        console.log(`Adding API for ${tenant || 'local environment'} ... `);
        let basePath = '';
        if (tenant) {
            basePath = `/tenants/${tenant}`;
        }
        const corsOptions = { origin: config.corsOrigin || `http://localhost:4200` };
        this.app.use(cors(corsOptions));
        this.app.options("*", cors(corsOptions));
        api.servers = [{ url: `${basePath}` }];
        this.app.use(`${basePath}/api-docs`, swaggerUi.serve, swaggerUi.setup(api));
        this.app.use(OpenApiValidator.middleware({
            apiSpec: api
        }));


        if (api.components.securitySchemes) {
            const scheme: OpenAPIV3.SecuritySchemeObject = Object.values(api.components.securitySchemes)[0] as OpenAPIV3.SecuritySchemeObject;
            const schemeName: string = Object.keys(api.components.securitySchemes)[0];
            if (scheme.type === 'openIdConnect') {
                const oidcConfig: WellKnown = await discover(scheme.openIdConnectUrl);
                const verify = (req: any, jwtPayload: any, done: any) => {
                    const scopesRequired: string[] = _.get(api.paths, `${req.path}.${req.method.toLowerCase()}.security[0].${schemeName}`) as string[];
                    console.log(`Validating request with permissions: ${jwtPayload[config.permissionClaim]} against requirements: ${scopesRequired}`);
                    if (jwtPayload && jwtPayload.sub && (!scopesRequired || scopesRequired.length === 0 || scopesRequired.some(s => (jwtPayload[config.permissionClaim] || []).includes(s)))) {
                        console.log(`Request validated with payload sub: ${jwtPayload.sub}`);
                        req.principal = jwtPayload;
                        return done(null, jwtPayload);
                    }

                    return done(null, false);
                };
                passport.use('jwt',
                    new JwtStrategy({
                        // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
                        secretOrKeyProvider: jwksClient.passportJwtSecret({
                            cache: true,
                            rateLimit: true,
                            jwksRequestsPerMinute: 5,
                            jwksUri: oidcConfig.jwks_uri
                        }),
                        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                        passReqToCallback: true,
                        issuer: oidcConfig.issuer,
                        algorithms: ['RS256']
                    }, verify)
                );

                this.app.use(passport.initialize());
            }
        }

        this.app.use(async (err: any, req: any, res: any, next: any) => {
            console.log(err);
            // format error
            res.status(err.status || 500).json({
                message: err.message,
                errors: err.errors,
            });
        });

        const upload = multer({ storage: multer.memoryStorage() });

        for (const [apiPath, item] of Object.entries(api.paths)) {
            const formattedPath = apiPath.replace(/\{(.+)\}/g, ':$1');
            const opPath = `${basePath}${formattedPath}`;
            for (const method of ['get', 'post', 'put', 'delete', 'patch', 'options'].filter(m => _.has(item, m))) {

                const apiConfig: OpenAPIV3.OperationObject = _.get(item, method);
                const middleware = [];
                if (apiConfig.security) {
                    middleware.push(passport.authenticate('jwt', { session: false }));
                }
                const multipart = (apiConfig.requestBody as OpenAPIV3.RequestBodyObject)?.content['multipart/form-data'];
                if (multipart) {
                    const uploadFields = [];
                    for (const [propName, propSpec] of Object.entries((multipart.schema as OpenAPIV3.SchemaObject).properties)) {
                        if ((propSpec as OpenAPIV3.SchemaObject).type === 'array'
                            && ((propSpec as OpenAPIV3.ArraySchemaObject).items as OpenAPIV3.SchemaObject).format === 'binary') {
                            uploadFields.push({ name: propName, maxCount: 10 });
                        }
                        if ((propSpec as OpenAPIV3.SchemaObject).type === 'string'
                            && (propSpec as OpenAPIV3.SchemaObject).format === 'binary') {
                            uploadFields.push({ name: propName, maxCount: 1 });
                        }
                    }
                    middleware.push(upload.fields(uploadFields));
                }
                this.expressRequest(method, opPath, middleware, async (aReq, aRes) => {
                    if (methodExecutors[apiPath] && methodExecutors[apiPath][method]) {
                        const methodDelegate = methodExecutors[apiPath][method];
                        try {
                            const params: any = { ...aReq };

                            if (methodDelegate.transactional) {
                                this.context.persistence.beginTransaction();
                            }
                            for (const delegate of methodDelegate.pipe) {
                                await delegate.process(this.context, params);
                            }
                            if (methodDelegate.transactional) {
                                this.context.persistence.commitTransaction();
                            }
                            if (methodDelegate.returnVar) {
                                const responseSpec = (apiConfig.responses[200] as OpenAPIV3.ResponseObject)?.content;
                                if (responseSpec) {
                                    const [contentType, contentSchema] = Object.entries(responseSpec)[0];
                                    if ((contentSchema.schema as OpenAPIV3.SchemaObject).type === 'string'
                                        && (contentSchema.schema as OpenAPIV3.SchemaObject).format === 'binary') {
                                        const dl: Buffer = params[methodDelegate.returnVar];
                                        aRes.status(200);
                                        aRes.set({
                                            'Cache-Control': 'no-cache',
                                            'Content-Type': contentType,
                                            'Content-Length': dl.byteLength,
                                            'Content-Disposition': 'attachment; filename=' + methodDelegate.returnVar
                                        });
                                        const bufferStream = new stream.PassThrough();
                                        bufferStream.end(dl);
                                        bufferStream.pipe(aRes);
                                    } else {
                                        aRes.status(200).send(params[methodDelegate.returnVar]);
                                    }
                                } else {
                                    aRes.status(200).send(params[methodDelegate.returnVar]);
                                }
                            } else {
                                aRes.status(200).send();
                            }
                        } catch (err) {
                            if (methodDelegate.transactional) {
                                this.context.persistence.rollbackTransaction();
                            }
                            console.error(err);
                            if (err.responseCode) {
                                aRes.status(err.responseCode).send(err.responseMessage);
                            } else {
                                aRes.status(500).send(err);
                            }
                        }
                    } else {
                        aRes.status(501).send('Method not yet implemented');
                    }

                });
            }
        }

        return Promise.resolve();
    }

    // TODO write a better impl
    private expressRequest(method: string, path: string, auth: any, handler: (req: any, res: any) => Promise<void>): void {
        // return express.prototype[method].bind(this.app)
        switch (method.toLowerCase()) {
            case 'get':
                !!auth ? this.app.get(path, auth, handler) : this.app.get(path, handler);
                break;
            case 'post':
                !!auth ? this.app.post(path, auth, handler) : this.app.post(path, handler);
                break;
            case 'delete':
                !!auth ? this.app.delete(path, auth, handler) : this.app.delete(path, handler);
                break;
            case 'put':
                !!auth ? this.app.put(path, auth, handler) : this.app.put(path, handler);
                break;
            case 'patch':
                !!auth ? this.app.patch(path, auth, handler) : this.app.patch(path, handler);
                break;
        }
    }
}