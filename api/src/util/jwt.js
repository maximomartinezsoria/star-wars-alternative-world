import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config.js'

export function signJwt(payload) {
  return jwt.sign(payload, jwtSecret)
}

export function verifyJwt(token) {
  return jwt.verify(token, jwtSecret)
}
