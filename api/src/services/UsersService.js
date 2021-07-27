import bcrypt from 'bcrypt'
import { AuthenticationError } from 'apollo-server-koa'
import { SQLDataSource } from 'datasource-sql'
import { signJwt } from '../util/jwt.js'

class UsersService extends SQLDataSource {
  async loginUser(username, password) {
    const user = await this.knex.select('*').from('users').where({ username })
    if (!user) throw new AuthenticationError("User doesn't exist")
    const credentialsMatch = bcrypt.compare(password, user.password)
    if (!credentialsMatch) throw new AuthenticationError('Wrong credentials')

    const token = signJwt({ user: { id: user.id, username } })
    return token
  }

  async registerUser(username, password) {
    const encryptedPassword = await bcrypt.hash(password, 10)
    const user = await this.knex
      .insert({ username, password: encryptedPassword })
      .into('users')
      .returning('*')

    const token = signJwt({ user: { id: user.id, username } })
    return token
  }
}

export default UsersService
