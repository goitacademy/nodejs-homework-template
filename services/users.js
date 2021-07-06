const { UsersRepository } = require('../repository')

class UserService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    }
  }

  async create(body) {
    const data = await this.repositories.users.create(body)
    return data
  }

  async findByEmail(email) {
    const data = await this.repositories.users.findByEmail(email)
    return data
  }

  async findById(id) {
    const data = await this.repositories.users.findById(id)
    return data
  }

  async update(id, body) {
    const data = await this.repositories.users.update(id, body)
    return data
  }
}

module.exports = UserService
