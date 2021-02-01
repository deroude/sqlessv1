import path from 'path';
import fs from 'fs';
import * as yaml from 'js-yaml';
import { GeneratorConfig } from "./GeneratorConfig";
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import Handlebars from 'handlebars';
import util from 'util';
import { generateKeyPair } from 'crypto';

global.Handlebars = Handlebars;

Handlebars.registerHelper("inc", (value) => Number(value) + 1);

import './templates/precompiled';

type PGType = 'serial' | 'varchar' | 'decimal' | 'int' | 'bigint' | 'boolean' | 'timestamptz';

const KEY_PATTERN = /\n|-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|-----BEGIN RSA PRIVATE KEY-----|-----END RSA PRIVATE KEY-----/g;

interface Property {
    name: string;
    nameSnake: string;
    type: PGType,
    isId: boolean;
    isRequired: boolean;
    fk?: string;
}

export interface Operation {
    method: string;
    delegate: string;
    template?: string;
    payload?: any
}

export interface Entity {
    name: string;
    nameSnake: string;
    properties: Property[];
}

export interface PathDelegate {
    path: string;
    operations: Operation[];
}

const typeMap: { [k: string]: PGType } = {
    'string': 'varchar',
    'string:date': 'timestamptz',
    'string:date-time': 'timestamptz',
    'string:password': 'varchar',
    'integer': 'int',
    'integer:int32': 'int',
    'integer:int64': 'bigint',
    'number': 'decimal',
    'number:float': 'decimal',
    'number:double': 'decimal',
    'boolean': 'boolean'
}

export function toSnake(a: string) { return a.substring(0, 1).toLowerCase() + a.substring(1).replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`); }

export function toDash(a: string) { return a.substring(0, 1).toLowerCase() + a.substring(1).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`); }

export function toCamel(a: string) { return a.split('_').map((tk, ix) => ix > 0 ? tk[0].toUpperCase() + tk.slice(1) : tk).join(''); }

export function objectToCamel(a: any) {
    const camel: any = {};
    Object.keys(a).forEach(k => {
        camel[toCamel(k)] = a[k];
    })
    return camel;
}

export function objectToSnake(a: any) {
    const camel: any = {};
    Object.keys(a).forEach(k => {
        camel[toSnake(k)] = a[k];
    })
    return camel;
}

export async function writeFile(fPath: string, f: HandlebarsTemplateDelegate, args: any): Promise<void> {
    const dirname = path.dirname(fPath);
    if (!fs.existsSync(dirname)) {
        try {
            await fs.promises.mkdir(dirname, { recursive: true });
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }
    }
    try {
        await fs.promises.writeFile(fPath, f(args), 'utf-8');
    } catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
    return Promise.resolve();
}

export async function loadApi(apiPath: string): Promise<OpenAPIV3.Document> {
    if (fs.existsSync(apiPath)) {
        try {
            return yaml.safeLoad(fs.readFileSync(apiPath, 'utf-8')) as OpenAPIV3.Document;
        } catch (err) {
            console.error(`Unable to load API file [${apiPath}]`);
            console.error(err);
            return Promise.reject(err);
        }
    }
}

export function loadEntities(api: OpenAPIV3.Document): Entity[] {
    const entities: Entity[] = [];
    for (const [k, v] of Object.entries(api.components.schemas)) {
        const entity: Entity = { name: k, nameSnake: toSnake(k), properties: [] };
        const schema: OpenAPIV3.SchemaObject = v as OpenAPIV3.SchemaObject;
        for (const [pk, pv] of Object.entries(schema.properties)) {
            if (isReference(pv)) {
                const ref = pv.$ref.match(refPattern);
                if (ref && ref[1]) {
                    entity.properties.push({
                        name: pk,
                        nameSnake: toSnake(pk),
                        isId: false,
                        isRequired: schema.required && schema.required.indexOf(pk.toLowerCase()) > 0,
                        type: 'int',
                        fk: toSnake(ref[1])
                    });
                }
            } else {
                entity.properties.push({
                    name: pk,
                    nameSnake: toSnake(pk),
                    isId: pk.toLowerCase() === 'id',
                    isRequired: schema.required && schema.required.indexOf(pk.toLowerCase()) > 0,
                    type: typeMap[pv.format ? `${pv.type}:${pv.format}` : pv.type]
                })
            }
        }

        entities.push(entity);
    }

    // Order entities according to the references
    let iter = 0;
    let sw = true;
    while (sw && iter++ < 10) {
        sw = false;
        for (let i = 0; i < entities.length; i++) {
            const e = entities[i];
            for (const prop of e.properties) {
                if (prop.fk) {
                    const si = entities.findIndex(o => o.nameSnake === prop.fk);
                    if (si > i) {
                        sw = true;
                        const oe: Entity = entities[si];
                        entities[si] = entities[i];
                        entities[i] = oe;
                        break;
                    }
                }
            }
        }
    }

    if (iter === 10) {
        console.warn('Circular FK detected');
    }

    return entities;
}

export function createPath(opItem: OpenAPIV3.OperationObject): string {
    if (opItem.tags && opItem.tags[0] && opItem.operationId) {
        return `queries/${opItem.tags.join('/')}/${toDash(opItem.operationId)}.yaml`;
    }
    return null;
}

export function loadDelegates(api: OpenAPIV3.Document, entities: Entity[]): PathDelegate[] {
    const pathDelegates: PathDelegate[] = [];
    for (const [p, ops] of Object.entries(api.paths)) {
        const pathDelegate: PathDelegate = { path: p, operations: [] };
        let entityMatch = p.match(batchPathPattern);
        let entityName: string;
        let isIdOp: boolean;
        if (entityMatch && entityMatch[1]) {
            entityName = entityMatch[1].toLowerCase();
            isIdOp = false;
        }
        if (!entityMatch) {
            entityMatch = p.match(idPathPattern);
            if (entityMatch && entityMatch[1]) {
                entityName = entityMatch[1].toLowerCase();
                isIdOp = true;
            }
        }
        let entity;
        if (!!entityMatch) {
            entity = entities.find(e => e.name.toLowerCase() === entityName);
        }
        if (entity) {
            for (const [op, opItem] of Object.entries(ops)) {
                let opDelegate: Operation;
                switch (op.toLowerCase()) {
                    case 'get':
                        if (isIdOp) {
                            opDelegate = {
                                method: op.toLowerCase(),
                                delegate: createPath(opItem) || `queries/get-single-${entityName}.yaml`,
                                template: 'get-entity-single.yaml',
                                payload: entity
                            };
                        } else {
                            opDelegate = {
                                method: op.toLowerCase(),
                                delegate: createPath(opItem) || `queries/get-list-${entityName}.yaml`,
                                template: 'get-entity-list.yaml',
                                payload: entity
                            };
                        }
                        break;
                    case 'post':
                        if (!isIdOp) {
                            opDelegate = {
                                method: op.toLowerCase(),
                                delegate: createPath(opItem) || `queries/add-${entityName}.yaml`,
                                template: 'add-entity.yaml',
                                payload: entity
                            }
                        } else {
                            opDelegate = {
                                method: op.toLowerCase(),
                                delegate: createPath(opItem) || `queries/generic${p.replace(/[\/;:\{\}]/g, '-')}-${op.toLowerCase()}.yaml`.toLowerCase(),
                                template: 'generic-handler.yaml',
                                payload: {}
                            }
                        }
                        break;
                    case 'delete':
                        if (isIdOp) {
                            opDelegate = {
                                method: op.toLowerCase(),
                                delegate: createPath(opItem) || `queries/delete-${entityName}.yaml`,
                                template: 'delete-entity.yaml',
                                payload: entity
                            }
                        } else {
                            opDelegate = {
                                method: op.toLowerCase(),
                                delegate: createPath(opItem) || `queries/generic${p.replace(/[\/;:\{\}]/g, '-')}-${op.toLowerCase()}.yaml`.toLowerCase(),
                                template: 'generic-handler.yaml',
                                payload: {}
                            }
                        }
                        break;
                    case 'put':
                    case 'patch':
                        if (isIdOp) {
                            opDelegate = {
                                method: op.toLowerCase(),
                                delegate: createPath(opItem) || `queries/update-${entityName}.yaml`,
                                template: 'update-entity.yaml',
                                payload: entity
                            }
                        } else {
                            opDelegate = {
                                method: op.toLowerCase(),
                                delegate: createPath(opItem) || `queries/generic${p.replace(/[\/;:\{\}]/g, '-')}-${op.toLowerCase()}.yaml`.toLowerCase(),
                                template: 'generic-handler.yaml',
                                payload: {}
                            }
                        }
                        break;
                }
                pathDelegate.operations.push(opDelegate);
            }
        } else {
            for (const [op, opItem] of Object.entries(ops).filter(([k, v]) => ['get', 'post', 'put', 'delete', 'patch'].includes(k))) {
                pathDelegate.operations.push({
                    method: op.toLowerCase(),
                    delegate: createPath(opItem) || `queries/generic${p.replace(/[\/;:\{\}]/g, '-')}-${op.toLowerCase()}.yaml`.toLowerCase(),
                    template: 'generic-handler.yaml',
                    payload: {}
                });
            }
        }
        pathDelegates.push(pathDelegate);
    }
    return pathDelegates;
}


function isReference(prop: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject): prop is OpenAPIV3.ReferenceObject {
    return (prop as OpenAPIV3.ReferenceObject).$ref !== undefined;
}

const refPattern = /^#\/components\/schemas\/(.+)$/;
const batchPathPattern = /^\/([^\/]+)$/;
const idPathPattern = /^\/([^\/]+)\/\{id\}$/

export class Generator {
    constructor(private config: GeneratorConfig) { }

    async init(): Promise<void> {
        let api: OpenAPIV3.Document;

        if (this.config.apiPath) {
            console.log(`Loading API from ${this.config.apiPath}`);
            api = await loadApi(this.config.apiPath);
        }

        if (!api) {
            console.error(`No API file available`);
            return Promise.reject('No API file available');
        }
        console.log('API loaded');

        const entities = loadEntities(api);

        await writeFile('.sqless/docker-compose.yaml', Handlebars.templates['docker-compose.yaml'], {});
        await writeFile('.sqless/postgres-init.sql', Handlebars.templates['postgres-init.sql'], {});
        await writeFile('.sqless/migrations/001_initial.sql', Handlebars.templates['001_initial.sql'], { entities });
        await writeFile('.sqless/migrations/001_initial_rollback.sql', Handlebars.templates['001_initial_rollback.sql'], { entities: entities.reverse() });

        const pathDelegates: PathDelegate[] = loadDelegates(api, entities);

        for (const delegate of pathDelegates) {
            console.log("Writing delegates for " + delegate.path);
            for (const op of delegate.operations) {
                console.log("\t - " + op.method + ": " + op.delegate);
                await writeFile(`.sqless/${op.delegate}`, Handlebars.templates[op.template], op.payload);
            }
        }

        await writeFile('.sqless/sqless-config.yaml', Handlebars.templates['sqless-config.yaml'], { apiPath: `../${this.config.apiPath.replace(/^\.[\/\\]/, '')}`, pathDelegates });

        // Security

        if (api.components.securitySchemes && api.components.securitySchemes && Object.keys(api.components.securitySchemes)[0]) {
            const realmName = Object.keys(api.components.securitySchemes)[0];
            const { publicKey, privateKey } = await util.promisify(generateKeyPair)('rsa', {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem'
                }
            });
            const server = api.servers && api.servers[0] ? api.servers[0].url : '';
            await writeFile('.sqless/realm-config.json', Handlebars.templates['realm-config.json'], {
                realmName,
                // publicKey,
                // privateKey,
                publicKey: publicKey.replace(KEY_PATTERN, ''),
                privateKey: privateKey.replace(KEY_PATTERN, ''),
                server
            });

        }

        return Promise.resolve();
    }
}