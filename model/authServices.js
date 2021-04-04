const UserRepository = require("../repository/usersRepository");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
class AuthService {
  constructor() {
    this.repository = { users: new UserRepository() };
  }

  async login({ email }) {
    const user = await this.repository.users.findUserByEmail(email);
    if (!user) {
      return null;
    }
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await this.repository.users.updateToken(id, token);
    return token;
  }

  async logout(id) {
    const data = await this.repository.users.updateToken(id, null);

    return data;
  }
}

module.exports = AuthService;
