
import routes from './api/api-routes';
import { PORT } from "./infrastructure/enviroment";
import { TennantApiHttpServer } from "./infrastructure/http/server";

export async function bootstrap() {
    // const sqlConnection = await handleSQLDatabaseConnection() 

    // const container = await handleIoc(sqlConnection, noSqlConnection)
    // const container = await handleIoc({} as any, {} as any)

    const server = new TennantApiHttpServer()

    await server.start({ port: Number(PORT), routes })

}

bootstrap()