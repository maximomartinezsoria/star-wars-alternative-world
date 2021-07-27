export function up(knex) {
  return Promise.all([
    knex.schema.createTable('friends', (table) => {
      table.increments().primary()
      table.integer('character_id_1').unsigned().notNullable()
      table.integer('character_id_2').unsigned().notNullable()

      table.unique(
        ['character_id_1', 'character_id_2'],
        'friends_character_id_1_character_id_2_unique'
      )
      table.timestamp('created_at').defaultTo(knex.fn.now())
    }),
  ])
}

export function down(knex) {
  return Promise.all([knex.schema.dropTable('friends')])
}
