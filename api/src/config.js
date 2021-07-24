import * as path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve('../.env') })

export const db = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

export const port = process.env.API_PORT
