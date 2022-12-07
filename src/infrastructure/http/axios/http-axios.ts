import axios, { AxiosInstance } from 'axios';
import { injectable } from "inversify";
import { IHttpClient, IHttpClientReponse } from "../client/interfaces/IHttpClient";

@injectable()
export class HttpAxios implements IHttpClient {
    http!: AxiosInstance

    constructor() {
        this.http = axios.create({})
    }

    async get(url: string, params: string | { [ket: string]: any; }, headers: { [ket: string]: any; }): Promise<IHttpClientReponse> {
        const { data, headers: responseHeaders, status } = await this.http.get(url, { params, headers })

        return {
            data,
            headers: responseHeaders,
            status
        }
    }
    async post(url: string, body: { [ket: string]: any; }, headers: { [ket: string]: any; }): Promise<IHttpClientReponse> {
        const { data, headers: responseHeaders, status } = await this.http.post(url, { headers, data: body })

        return {
            data,
            headers: responseHeaders,
            status
        }
    }
    async put(url: string, body: { [ket: string]: any; }, headers: { [ket: string]: any; }): Promise<IHttpClientReponse> {
        const { data, headers: responseHeaders, status } = await this.http.put(url, { headers, data: body })

        return {
            data,
            headers: responseHeaders,
            status
        }
    }
    async patch(url: string, body: { [ket: string]: any; }, headers: { [ket: string]: any; }): Promise<IHttpClientReponse> {
        const { data, headers: responseHeaders, status } = await this.http.patch(url, { headers, data: body })

        return {
            data,
            headers: responseHeaders,
            status
        }
    }
    async delete(url: string, body: { [ket: string]: any; }, headers: { [ket: string]: any; }): Promise<IHttpClientReponse> {
        const { data, headers: responseHeaders, status } = await this.http.delete(url, { headers, data: body })

        return {
            data,
            headers: responseHeaders,
            status
        }
    }

}