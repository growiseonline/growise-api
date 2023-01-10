import { inject, injectable } from "inversify";
import { InternalServerError, ResourceNotFound } from "../../infrastructure/crosscutting/errors";
import { IAction } from "../../infrastructure/crosscutting/interfaces";
import { ConnectionManager } from "../../infrastructure/database/mysqldb/connection/connection-manager";
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
        let tennatResult: IGetTennnatResponse

        try {
            tennatResult = await this.gettennat(props.slug);
        } catch (err: any) {
            const errorCode = err.response.status

            if (errorCode === 404) throw new ResourceNotFound('TennantNotFound', 'This tennant was not found')

            throw new InternalServerError(err.data, err)
        }

        const syncronize = await this.syncronize(tennatResult);

        return { connectionmanager: syncronize };
    }

    async gettennat(slug: string) {
        return await this.tennantMasterClient.getTennant({ slug });
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
        // await connection.createDatabaseIfNotExists()
        await connection.conect();
        await connection.setup();

        return connection;

    }




}
