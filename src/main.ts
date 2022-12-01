
import { handleSQLDatabaseConnection } from "./infrastructure/database/postgree/connection";
import { IHttpServer } from "./infrastructure/http/server/interfaces";
import { handleIoc } from "./infrastructure/ioc";
import { TYPES } from "./infrastructure/ioc/types";
import routes from './api/api-routes'
import { handleNoSQLDatabaseConnection } from "./infrastructure/database/mongodb/connection";
import { PORT } from "./infrastructure/enviroment";

export async function bootstrap() {
    // const sqlConnection = await handleSQLDatabaseConnection()
    const noSqlConnection = await handleNoSQLDatabaseConnection()

    // const container = await handleIoc(sqlConnection, noSqlConnection)
    const container = await handleIoc({} as any, noSqlConnection)

    const server = container.get<IHttpServer>(TYPES.WebApiService)

    await server.start({ port: Number(PORT), routes })

}

bootstrap()