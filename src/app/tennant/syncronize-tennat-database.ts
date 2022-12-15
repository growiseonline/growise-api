import { inject, injectable } from "inversify";
import { Interface } from "readline";
import { IAction } from "../../infrastructure/crosscutting/interfaces";
import { ConnectionManager } from "../../infrastructure/database/mysqldb/connection/connection-manager";
import { handleSQLDatabaseConnection } from "../../infrastructure/database/postgree/connection";
import { TennantMasterClient } from "../../infrastructure/http/client/tennant-master-client";
import { TYPES } from "../../infrastructure/ioc/types";
import { IGetTennnatResponse } from "./interfaces";

export interface ISyncronizeTennantProps {
    slug: string;
}

export interface ISyncronizeDatabaseResponse {
    connectionmanager: ConnectionManager
}
@injectable()
export class SyncronizeTennant implements IAction<ISyncronizeTennantProps, ISyncronizeDatabaseResponse> {

    constructor(@inject(TYPES.TennantMasterClient) private readonly tennantMasterClient: TennantMasterClient) {

    }
    async execute(props: ISyncronizeTennantProps): Promise<ISyncronizeDatabaseResponse> {
        const tennatResult = await this.gettennat(props.slug);

        const syncronize = await this.syncronize(tennatResult);

        return { connectionmanager: syncronize };
    }

    async gettennat(slug: string) {
        const tennat = await this.tennantMasterClient.getTennant({ slug });
        return tennat;
    }

    async syncronize({ sqlConnection, slug }: IGetTennnatResponse) {

        const connection = new ConnectionManager({
            host: sqlConnection.host,
            slug,
            database: sqlConnection.datbase,
            password: sqlConnection.password,
            port: sqlConnection.port,
            userName: sqlConnection.username
        })
        await connection.conect();
        await connection.setup();

        return connection;

    }




}
