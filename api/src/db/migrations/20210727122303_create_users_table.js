export function up(knex) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments().primary()
      table.string('username').notNullable().unique()
      table.string('password').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
    }),
  ])
}

export function down(knex) {
  return Promise.all([knex.schema.dropTable('users')])
}
