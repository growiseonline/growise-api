require('dotenv').config()

export const TENNANT_SERVER_URL = process.env.TENNANT_SERVER_URL!
export const TENNANT_DATABASE = process.env.TENNANT_DATABASE!
export const TENNANT_PASSWORD = process.env.TENNANT_PASSWORD!
export const TENNANT_USER = process.env.TENNANT_USER!
export const TENNANT_PORT = Number(process.env.TENNANT_PORT!)
export const MONGO_URI = process.env.MONGO_URI!
export const PORT = process.env.PORT!

