import { IValidationSchema } from "../../../crosscutting/utils/validation.utils"

export interface AplicationContext {
    get<T>(indentifier: symbol): T
}

export interface AplicationOptions {
    context: AplicationContext
}

export type AllowedHttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface IHttpHeaders {
    [headerName: string]: string | string[]
}

export interface IHttpRequest<Payload, PayloadParam = Payload> {
    headers: IHttpHeaders
    body: Payload
    params: PayloadParam
    query: PayloadParam
    context: { [key: string]: any }
}

export type RequestBeforeHandler<T> = (req: IHttpRequest<T>, aplication: AplicationOptions) => Promise<IHttpRequest<T>>
export type RequestHandler<T> = (req: IHttpRequest<T>, aplication: AplicationOptions) => Promise<T>

export interface IHttpRouteValidation {
    bodyValidation?: IValidationSchema
    queryValidation?: IValidationSchema
    paramValidation?: IValidationSchema
}

export interface IHttpRouteProps {
    path: string
    before?: RequestBeforeHandler<any>[] | RequestBeforeHandler<any>
    handler: RequestHandler<any>
    after?: (result: any, aplication: AplicationOptions) => Promise<any>
}

export interface IHttpRoute {
    method: AllowedHttpMethods
    validation?: IHttpRouteValidation
    routeProps: IHttpRouteProps
}

export interface IServerProps {
    port: number
    routes: IHttpRoute[]
}

export interface IHttpServer {
    getStartTime(): Date
    start(props: IServerProps): Promise<void>
    onServerUp(serverInstance: any, serverProps: IServerProps): Promise<void>
    getRoutes(): IHttpRoute[]
}