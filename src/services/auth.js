const { usersRepository } = require('../repository')
const { OPERATION_STATUS } = require('../helpers/constants')
const jwt = require('jsonwebtoken')
require('dotenv-expand')(require('dotenv').config())

const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthServices {
  constructor() {
    this.repositories = { users: usersRepository }
  }

  async loginUser({ email, password }) {
    try {
      const user = await this.repositories.users.findUserByEmail(email)
        if (!user) {
        return OPERATION_STATUS.USER_NOT_FOUND
      }
      if (!user || !(await user.isValidPassword(password))) {
        return null
      }

       if (!user.verify) {
        return OPERATION_STATUS.NEED_VERIFICATION
      }
      const id = user.id
      const payload = { id }
      const token = jwt.sign(payload, SECRET_KEY)
      // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5h' })
      await this.repositories.users.updateUserToken(id, token)
      return token
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async logoutUser(id) {
    try {
      return await this.repositories.users.updateUserToken(id, null)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

module.exports = { AuthServices }