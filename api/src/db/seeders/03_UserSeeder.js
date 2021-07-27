export async function seed(knex) {
  const tableName = 'users'
  return knex(tableName)
    .del()
    .then(() =>
      knex(tableName).insert([{ username: 'admin', password: 'admin' }])
    )
}
