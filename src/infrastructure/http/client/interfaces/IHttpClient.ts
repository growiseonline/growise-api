
export interface IHttpClientReponse {
    data: any
    headers: any //{ [ket: string]: string }
    status: number
}

export interface IHttpClient {
    get(url: string, params: string | { [ket: string]: any }, headers: { [ket: string]: any }): Promise<IHttpClientReponse>
    post(url: string, body: { [ket: string]: any }, headers: { [ket: string]: any }): Promise<IHttpClientReponse>
    put(url: string, body: { [ket: string]: any }, headers: { [ket: string]: any }): Promise<IHttpClientReponse>
    patch(url: string, body: { [ket: string]: any }, headers: { [ket: string]: any }): Promise<IHttpClientReponse>
    delete(url: string, body: { [ket: string]: any }, headers: { [ket: string]: any }): Promise<IHttpClientReponse>
}