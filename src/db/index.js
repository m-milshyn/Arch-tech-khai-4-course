import 'dotenv/config'
import pkg from 'pg'
const { Pool } = pkg
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema.js'

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD || ''),
    database: process.env.DB_NAME,
})

export const db = drizzle(pool)
export const { users, products } = schema