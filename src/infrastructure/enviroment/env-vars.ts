require('dotenv').config()
export const STAGE = 'development'
export const PORT = process.env.PORT as any as number
export const TENNANT_API_BASE_URL = process.env.TENNANT_API_BASE_URL!
export const TENNANT_DATABASE = process.env.TENNANT_DATABASE!
export const TENNANT_PASSWORD = process.env.TENNANT_PASSWORD!
export const TENNANT_PORT = process.env.TENNANT_PORT!
export const TENNANT_SERVER_URL = process.env.TENNANT_SERVER_URL!
export const TENNANT_USER = process.env.TENNANT_USER!




