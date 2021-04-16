const { UserRepository } = require('../repository/userRepository')

class UserService {
  constructor() {
       this.repository = new UserRepository   
  }

  async addUser(body) {
    const data =  await this.repository.addUser(body)
    return data
  }

  async getById(contactId) {
    const data = await this.repository.getById(contactId)
    return data
  }
  async getByEmail(email) {
    const data = await this.repository.getByEmail(email)
    return data
  }
  async updateSubscription(userID, body) {
    const data = await this.repository.updateSubscription(userID, body)
    return data
  }
}

module.exports = { UserService }