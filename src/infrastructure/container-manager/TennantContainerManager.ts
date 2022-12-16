import { Container } from "inversify";
import { IGetTennnatResponse } from "../../app/tennant/interfaces";
import { addInMinutes } from "../crosscutting/utils";
import { TennantMasterClient } from "../http/client/tennant-master-client";
import { IHttpServer } from "../http/server/interfaces";
import { handleIoc } from "../ioc";
import { ConnectionManager } from './../database/mysqldb/connection/'

const DEFAULT_BUFFER_EXPIRATION_TIME_IN_SECONDS = 60 * 10 // 10 MINUTES

interface ITennantData {
    container: Container
    lastAccessAt: Date
    instantiadedAt: Date
    expiresAt: Date
}

export class TennantContainerManager {
    tennantBuffer: { [key: string]: ITennantData } = {}

    constructor(
        private readonly httpServer: IHttpServer,
        private readonly tennantMasterClient: TennantMasterClient
    ) { }


    async getTennantData(slug: string): Promise<ITennantData> {

        if (this.tennantBuffer[slug]) {
            return this.tennantBuffer[slug]
        }

        console.log('Create tennant', slug);
        return this.createTennantData(slug)
    }

    private async createTennantData(slug: string): Promise<ITennantData> {
        const tennantData = await this.tennantMasterClient.getTennant({ slug })
        const connection = await this.handleSqlConnection(tennantData)

        const newContaier = await handleIoc(
            connection.connection, // inserir conexão com sql aqui
            {},
            this.httpServer
        )

        this.tennantBuffer[slug] = {
            container: newContaier,
            instantiadedAt: new Date,
            lastAccessAt: new Date,
            expiresAt: addInMinutes(new Date, DEFAULT_BUFFER_EXPIRATION_TIME_IN_SECONDS)
        }

        return this.tennantBuffer[slug]
    }

    protected async getBufferLength() {
        return Object.keys(this.tennantBuffer).length
    }

    private async handleSqlConnection({ sqlConnection, slug }: IGetTennnatResponse) {
        const { datbase, host, password, port, username } = sqlConnection

        const connection = new ConnectionManager({
            database: datbase,
            host,
            password,
            port,
            userName: username,
            slug,
        })

        return connection
    }
}