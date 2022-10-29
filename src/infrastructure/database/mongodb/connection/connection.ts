import mongoose from 'mongoose';
import { resolve } from 'path';
import { MONGO_URI } from "../../../enviroment";

export async function handleNoSQLDatabaseConnection() {

    const connection = await mongoose.createConnection(MONGO_URI)

    return new Promise((resolve, reject) => {

        connection.on('connected', () => {
            console.log('NoSQL database connection successfull, conected  at port:', Number(connection.port));

            resolve(connection)
        })

        connection.on('error', (err) => {

            reject(connection)
        })
    })
}