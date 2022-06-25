const { v4: uuidv4 } = require('uuid')

const { usersRepository } = require('../repository')
const { EmailServices } = require('./email')
const { OPERATION_STATUS } = require('../helpers/constants')

const emailServices = new EmailServices()
class UserServices {
  constructor() {
    this.repositories = { users: usersRepository }
  }

  async signupUser(body) {
    try {
      const { email, name } = body

      const verifyToken = uuidv4()
      await emailServices.send(email, verifyToken, name)

      return await this.repositories.users.signupUser(body, verifyToken)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async findUserById(id) {
    try {
      return await this.repositories.users.findUserById(id)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async findUserByEmail(email) {
    try {
      return await this.repositories.users.findUserByEmail(email)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async updateUserSubscription(userId, { subscription }) {
    try {
      return await this.repositories.users.updateUserSubscription(userId, {
        subscription,
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async updateUserAvatar(userId, avatarURL, avatarCloudId = null) {
    try {
      return await this.repositories.users.updateUserAvatar(userId, {
        avatarURL,
        avatarCloudId,
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async updateUserToken(id, token) {
    try {
      return await this.repositories.users.updateUserToken(id, token)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async verifyUser(token) {
    try {
      return await this.repositories.users.verifyUser(token)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async verifyUserOneMoreTime(email) {
    try {
      const data = await this.repositories.users.verifyUserOneMoreTime(email)
      if (!data) {
        return OPERATION_STATUS.FAIL
      }

      const { email: userEmail, verifyToken, name, verify } = data

      if (!verify) {
        await emailServices.send(userEmail, verifyToken, name)
        return OPERATION_STATUS.SUCCESS
      }
      return OPERATION_STATUS.ERROR
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

module.exports = { UserServices }