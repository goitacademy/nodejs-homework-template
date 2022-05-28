const jwt = require("jsonwebtoken");
const { userMethod } = require("../../repository");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const { JWT_SECRET_KEY } = process.env;

class AuthService {
  async isUserExist(email) {
    const user = await userMethod.findByEmail(email);
    return !!user;
  }

  async create(body) {
    const { id, name, email, role } = await userMethod.createUser(body);
    return {
      id,
      name,
      email,
      role,
    };
  }

  async getUser(email, password) {
    const user = await userMethod.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  getToken(user) {
    const { id, email } = user;
    const payload = { id, email };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "8h" });
    return token;
  }

  async setToken(id, token) {
    await userMethod.updateToken(id, token);
  }

  async getCurrentDataFromToken(token) {
    return await jwt.verify(token, JWT_SECRET_KEY);
  }
}
module.exports = AuthService;
