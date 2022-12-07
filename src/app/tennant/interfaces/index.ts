
export interface IGetTennantProps {
    slug: string
}

export interface IGetTennnatResponseSqlConnection {
    host: string
    datbase: string
    username: string
    password: string
    port: number
    type: string
}

export interface IGetTennnatResponse {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    slug: string
    sqlConnection: IGetTennnatResponseSqlConnection
}
