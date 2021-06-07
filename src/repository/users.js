const Users = require("../schemas/users");

class UsersReporitory {
  constructor() {
    this.Model = Users;
  }

  async findById(id) {
    const result = await this.Model.findOne({ _id: id });
    return result;
  }

  async findByEmail(email) {
    const result = await this.Model.findOne({ email });
    return result;
  }

  async addUser(body) {
    const user = new this.Model(body);
    return user.save();
  }

  async updateToken(id, token) {
    await this.Model.updateOne({ _id: id }, { token });
  }

  async findByTokenCurrent(token) {
    const { email, subscription } = await this.Model.findOne({ token });
    return { email, subscription };
  }

  async updateSubscriptionStatus(userId, id, body) {
    console.log(userId, id, body);
    const result = await this.model.findByIdAndUpdate(
      { _id: id, userId },
      { ...body },
      { new: true }
    );
    return result;
  }
}

module.exports = { UsersReporitory };
