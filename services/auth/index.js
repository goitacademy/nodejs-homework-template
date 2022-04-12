// const jwt = require("jsonwebtoken");
const Users = require("../../repository/users");
const { HTTP_STATUS_CODES } = require("../../libs/constant");
const { CustomeError } = require("../../middleware/error-handler");
// const SECRET_KEY = process.env.JWT_SECRET_KEY;
class AuthService {
  async create(body) {
    const user = await Users.findByEmail(body.email);
    if (user) {
      throw new CustomeError(HTTP_STATUS_CODES.CONFLICT, "User already exists");
    }
    const newUser = await Users.create(body);
    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    };
  }

  async login({ email, password }) {}
  async logout(id) {}
}

module.exports = new AuthService();
