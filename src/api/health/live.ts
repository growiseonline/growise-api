import mongoose, { Mongoose } from 'mongoose'
import { DataSource } from 'typeorm'
import { AplicationOptions, IHttpRoute, IHttpServer } from '../../infrastructure/http/server/interfaces'
import { TYPES } from '../../infrastructure/ioc/types'


const route: IHttpRoute = {
    method: 'GET',
    routeProps: {
        path: '/live',
        async handler(request, aplication: AplicationOptions) {
            const sqlConnection = await aplication.context.get<DataSource>(TYPES.SQLConnection)
            const noSqlConnection = await aplication.context.get<mongoose.Connection>(TYPES.NoSQLConnection)
            const httpServer = await aplication.context.get<IHttpServer>(TYPES.WebApiService)

            const serverIsUpSince = httpServer.getStartTime()
            const sqlConnectionIsUp = sqlConnection.isInitialized
            const noSqlConnectionIsUp = noSqlConnection.readyState === 1

            return {
                sqlConnectionIsUp,
                noSqlConnectionIsUp,
                serverIsUpSince
            }
        },

    }
}

export default route