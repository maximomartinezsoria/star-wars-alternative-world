export function up(knex) {
  return Promise.all([
    knex.schema.createTable('planets', (table) => {
      table.increments().primary()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('code', 10).notNullable()
      table.string('picture_url').notNullable()
    }),
  ])
}

export function down(knex) {
  return Promise.all([knex.schema.dropTable('planets')])
}
