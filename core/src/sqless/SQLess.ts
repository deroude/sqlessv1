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
            if (scheme.type === 'openIdConnect') {
                const oidcConfig: WellKnown = await discover(scheme.openIdConnectUrl);
                const verify = (jwtPayload: any, done: any) => {

                    if (jwtPayload && jwtPayload.sub) {
                        return done(null, jwtPayload);
                    }

                    return done(null, false);
                };
                passport.use(
                    new JwtStrategy({
                        // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
                        secretOrKeyProvider: jwksClient.passportJwtSecret({
                            cache: true,
                            rateLimit: true,
                            jwksRequestsPerMinute: 5,
                            jwksUri: oidcConfig.jwks_uri
                        }),
                        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

                        issuer: oidcConfig.issuer,
                        algorithms: ['RS256']
                    }, verify)
                );

                this.app.use(passport.initialize());
            }
        }

        this.app.use(async (err: any, req: any, res: any, next: any) => {
            // format error
            res.status(err.status || 500).json({
                message: err.message,
                errors: err.errors,
            });
        });
        for (const [apiPath, item] of Object.entries(api.paths)) {
            const formattedPath = apiPath.replace(/\{(.+)\}/g, ':$1');
            const opPath = `${basePath}${formattedPath}`;
            for (const method of ['get', 'post', 'put', 'delete', 'patch', 'options'].filter(m => _.has(item, m))) {

                const apiConfig: OpenAPIV3.OperationObject = _.get(item, method);

                this.expressRequest(method, opPath, apiConfig.security ? passport.authenticate('jwt', { session: false }) : null, async (aReq, aRes) => {
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
                                aRes.status(200).send(params[methodDelegate.returnVar]);
                            } else {
                                aRes.status(200).send();
                            }
                        } catch (err) {
                            if (methodDelegate.transactional) {
                                this.context.persistence.rollbackTransaction();
                            }
                            console.error(err);
                            aRes.status(500).send(err);
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