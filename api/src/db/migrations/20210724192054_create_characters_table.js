export function up(knex) {
  return Promise.all([
    knex.schema.createTable('characters', (table) => {
      table.increments().primary()
      table.integer('planet_id').unsigned().notNullable()
      table.string('name', 255).notNullable()
      table.string('description', 255).notNullable()
      table.datetime('born_at').notNullable()
      table.string('picture_url', 255).notNullable()

      table.foreign('planet_id').references('id').inTable('planets')
    }),
  ])
}

export function down(knex) {
  return Promise.all([knex.schema.dropTable('characters')])
}
