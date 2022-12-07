require('dotenv').config()

export const PORT = process.env.PORT as any as number
export const TENNANT_API_BASE_URL = process.env.TENNANT_API_BASE_URL! 
