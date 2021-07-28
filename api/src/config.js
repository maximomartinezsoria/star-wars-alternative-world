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

export const knexConfig = {
  client: 'pg',
  connection: db,
  pool: { min: 0, max: 10 },
}

// Heroku will set PORT variable
export const port = process.env.PORT || process.env.API_PORT

export const jwtSecret = process.env.JWT_SECRET
