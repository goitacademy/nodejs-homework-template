const { UsersReporitory } = require("../repository");

class UserService {
  constructor() {
    this.repositories = {
      users: new UsersReporitory(),
    };
  }

  async addUser(body) {
    const data = await this.repositories.users.addUser(body);
    return data;
  }

  async findByEmail(email) {
    const data = await this.repositories.users.findByEmail(email);
    return data;
  }

  async findById(id) {
    const data = await this.repositories.users.findById(id);
    return data;
  }

  async findByTokenCurrent(token) {
    const data = await this.repositories.users.findByTokenCurrent(token);
    return data;
  }

  async updateSubscriptionStatus(id, contactId, body) {
    const data = await this.repositories.users.updateSubscriptionStatus(
      id,
      contactId,
      body
    );
    return data;
  }
}

module.exports = { UserService };
