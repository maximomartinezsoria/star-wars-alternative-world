import { db as dbConfig } from './src/config.js'

const client = 'pg'

const knex = {
  development: {
    client,
    version: '12',
    connection: dbConfig,
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeders',
    },
    pool: {
      min: 0,
    },
  },

  production: {
    client,
    version: '12',
    connection: dbConfig,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}

export default knex
