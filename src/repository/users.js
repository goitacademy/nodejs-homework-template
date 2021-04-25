const User = require("../schemas/user");

class UsersRepository {
  constructor() {
    this.model = User;
  }

  async findById(id) {
    const result = await this.model.findOne({ _id: id });
    return result;
  }

  async findByEmail(email) {
    const result = await this.model.findOne({ email });
    return result;
  }

  async create(body) {
    const user = new this.model(body);
    //так сделали чтобы сработал хук на pre save
    return user.save();
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token });
  }

  async update(id, body) {
    const result = await this.model.findByIdAndUpdate({ _id: id }, { ...body });
    return result;
  }

  async updateAvatar(id, avatarURL, idCloudAvatar) {
    await this.model.updateOne({ _id: id }, { avatarURL, idCloudAvatar });
  }

  async getAvatar(id) {
    const { avatarURL, idCloudAvatar } = await this.model.findOne({ _id: id });
    return { avatarURL, idCloudAvatar };
  }
}

module.exports = UsersRepository;
