

export interface ITennantEntity {
    id: string
    createdAt: Date
    updatedAt: Date

    name: string
    slug: string
    sqlConnection: { [key: string]: any }

}