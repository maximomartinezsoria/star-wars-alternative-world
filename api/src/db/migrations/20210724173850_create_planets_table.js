export function up(knex) {
  return Promise.all([
    knex.schema.createTable('planets', (table) => {
      table.increments().primary()
      table.string('name').notNullable()
      table.string('description', 300).notNullable()
      table.string('code', 9).notNullable().unique()
      table.string('picture_url').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
    }),
  ])
}

export function down(knex) {
  return Promise.all([knex.schema.dropTable('planets')])
}
