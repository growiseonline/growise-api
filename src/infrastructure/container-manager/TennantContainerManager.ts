import { Container } from "inversify";
import { addInMinutes } from "../crosscutting/utils";
import { IHttpServer } from "../http/server/interfaces";
import { handleIoc } from "../ioc";

const DEFAULT_BUFFER_EXPIRATION_TIME_IN_SECONDS = 60 * 10 // 10 MINUTES

interface ITennantData {
    container: Container
    lastAccessAt: Date
    instantiadedAt: Date
    expiresAt: Date
}

export class TennantContainerManager {
    tennantBuffer: { [key: string]: ITennantData } = {}

    constructor(private readonly httpServer: IHttpServer) { }

    async getTennantData(slug: string): Promise<ITennantData> {
        console.log('GET tennant', slug);

        if (this.tennantBuffer[slug]) {
            console.log('Retrieve tennant', slug);
            return this.tennantBuffer[slug]
        }

        console.log('Create tennant', slug);
        return this.createTennantData(slug)
    }

    async createTennantData(slug: string): Promise<ITennantData> {
        const newContaier = await handleIoc(
            {}, // inserir conexão com sql aqui
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

    async getBufferLength() {
        return Object.keys(this.tennantBuffer).length
    }
}