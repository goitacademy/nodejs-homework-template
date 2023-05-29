const { User } = require("../models");

class UserServices {
  async register(email, password) {
    const result = await User.create({ email, password });
    if (!result) {
      return null;
    }

    return result;
  }

  async login(email) {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    return user;
  }

  async findUser(email) {
    const userCheck = await User.findOne({ email });
    return userCheck;
  }
}

module.exports = new UserServices();
