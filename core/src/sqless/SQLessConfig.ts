import { MailConfig } from "../service/mail/MailConfig";
import { MongoConfig } from "../service/mongo/MongoConfig";
import { PostgresConfig } from "../service/postgres/PostgresConfig";

export interface SQLessConfig {
    version: string;
    dbConnection?: PostgresConfig | MongoConfig;
    migrations?: { id: string; applyPath: string; rollbackPath: string }[];
    mail?: MailConfig;
    apiPath?: string;
    methodPaths?: { [path: string]: { [method: string]: { path: string } } }
    corsOrigin?: string,
    security?: {
        clientId: string,
        clientSecret: string,
        issuerUrl: string
    }
}
export const DEFAULT_CONFIG: SQLessConfig = {
    version: '0.0.1',
    dbConnection: {
        type: 'postgres',
        database: 'postgres',
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres'
    }
}

