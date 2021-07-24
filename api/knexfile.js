import { db as dbConfig } from './src/config.js'

const { database, user, password, host, port } = dbConfig
const client = 'pg'

const knex = {
  development: {
    client,
    version: '12',
    connection: {
      database,
      user,
      password,
      host,
      port,
    },
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
    connection: {
      database,
      user,
      password,
      host,
      port,
    },
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
