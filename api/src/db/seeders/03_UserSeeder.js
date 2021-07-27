import bcrypt from 'bcrypt'

export async function seed(knex) {
  const tableName = 'users'
  const password = await bcrypt.hash('admin', 10)
  return knex(tableName)
    .del()
    .then(() => knex(tableName).insert([{ username: 'admin', password }]))
}
