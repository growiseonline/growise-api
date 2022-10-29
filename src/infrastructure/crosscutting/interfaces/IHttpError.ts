
export interface IHttpError {
    statusCode: number
    name: string
    message: string
    data?: any
    stack?: any
}