const { UsersRepository } = require('../repository')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    }
  }

  async login({ email, password }) {
    const user = await this.repositories.users.findByEmail(email)
    if (!user || !user.validPassword(password)) {
      return null
    }
    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' })
    await this.repositories.users.updateToken(id, token)
    return token
  }

  async logout(id) {
    const data = await this.repositories.users.updateToken(id, null)
    return data
  }
}

module.exports = AuthService
