const { UserModel } = require("../users/user.model");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");

class AuthService {
  async signUp(userParams) {
    const { email, password } = userParams;
    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      throw new Conflict("User with this email is already exist");
    }
    const passwordHash = await this.hashPassword(password);
    const user = await UserModel.create({ email, password: passwordHash });
    return user;
  }

  async hashPassword(password) {
    return bcrypt.hash(password, 8);
  }
}

exports.AuthService = new AuthService();
