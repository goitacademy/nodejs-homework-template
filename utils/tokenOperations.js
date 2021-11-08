const JWT = require("jsonwebtoken");
require("dotenv").config();

const { JWT_KEY } = process.env;

const token = {
  token: null,
  get(id) {
    this.token = JWT.sign({ id }, JWT_KEY, { expiresIn: "3h" });
    return this.token;
  },
  verify(token) {
    return JWT.verify(token, JWT_KEY);
  },
  decode(token) {
    return JWT.decode(token);
  },
  getIdByToken(token) {
    return this.decode(token).id;
  },
  clear() {
    this.token = null;
    return "";
  },
};

module.exports = token;
