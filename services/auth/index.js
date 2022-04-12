// const jwt = require("jsonwebtoken");
// const Users = require("../../repository/users");
// const { HTTP_STATUS_CODES } = require("../../libs/constant");
// const SECRET_KEY = process.env.JWT_SECRET_KEY;
class AuthService {
  async create(body) {}
  async login({ email, password }) {}
  async logout(id) {}
}

module.exports = new AuthService();
