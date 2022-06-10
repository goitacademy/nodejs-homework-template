const { usersRepository } = require('../repository')

class UserServices {
  constructor() {
    this.repositories = { users: usersRepository }
  }

  async createUser(body) {
    try {
      const data = await this.repositories.users.createUser(body)
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async findUserById(id) {
    try {
      const data = await this.repositories.users.findUserById(id)
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async findUserByEmail(email) {
    try {
      const data = await this.repositories.users.findUserByEmail(email)
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async updateUserSubscription(userId, body) {
    try {
      const data = await this.repositories.users.updateUserSubscription(
        userId,
        body,
      )
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async updateUserToken(id, token) {
    try {
      const data = await this.repositories.users.updateUserToken(id, token)
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

module.exports = { UserServices }