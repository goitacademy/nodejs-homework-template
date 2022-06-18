const { usersRepository } = require('../repository')

class UserServices {
  constructor() {
    this.repositories = { users: usersRepository }
  }

 async signupUser(body) {
    try {
      const data = await this.repositories.users.signupUser(body)
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

  async updateUserSubscription(userId, { subscription }) {
    try {
      const data = await this.repositories.users.updateUserSubscription(
        userId,
        { subscription },
      )
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async updateUserAvatar(userId, avatarURL, avatarCloudId = null) {
    try {
      const data = await this.repositories.users.updateUserAvatar(userId, {
        avatarURL,
        avatarCloudId,
      })
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