export function up(knex) {
  return Promise.all([
    knex.schema.createTable('characters', (table) => {
      table.increments().primary()
      table.integer('planet_id').unsigned().notNullable()
      table.string('name').notNullable()
      table.string('description', 300).notNullable()
      table.datetime('born_at').notNullable()
      table.string('picture_url').notNullable()

      table.foreign('planet_id').references('id').inTable('planets')
    }),
  ])
}

export function down(knex) {
  return Promise.all([knex.schema.dropTable('characters')])
}
