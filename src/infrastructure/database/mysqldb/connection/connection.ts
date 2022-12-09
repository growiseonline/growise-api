import { DataSource } from "typeorm"
import { TENNANT_DATABASE, TENNANT_PASSWORD, TENNANT_PORT, TENNANT_SERVER_URL, TENNANT_USER } from "../../../enviroment";
// import { POSTGRES_DATABASE, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_SERVER_URL, POSTGRES_USER } from "../../../enviroment"
// import { sqlSchemasAgretion } from "../schema"

export async function handleSQLDatabaseConnection() {
    const databaseConneciton = new DataSource({
        type: "mysql",
        host: TENNANT_SERVER_URL,
        port: Number(TENNANT_PORT),
        username: TENNANT_USER,
        password: TENNANT_PASSWORD,
        database: TENNANT_DATABASE,
        logging: false,
        entities: [],
        subscribers: [],
        migrations: [],
    })

    await databaseConneciton.initialize()
    await databaseConneciton.synchronize()

    console.log('SQL database connection successfull, conected to base', `"${databaseConneciton.options.database}" at port:`, TENNANT_PORT);
    return databaseConneciton
}