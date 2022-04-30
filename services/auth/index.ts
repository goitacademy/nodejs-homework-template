const jwt = require("jsonwebtoken");
const {
  findByEmail,
  createUser,
  updateToken,
} = require("../../repository/users");
const { HTTP_STATUS_CODE } = require("../../libs/constants");
const { CustomError } = require("../../middleware/error-handler");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async create(body) {
    const user = await findByEmail(body.email);
    if (user) {
      throw new CustomError(HTTP_STATUS_CODE.CONFLICT, "Email in use");
    }
    const newUser = await createUser(body);
    return {
      id: newUser.id,
      email: newUser.email,
      subscription: newUser.subscription,
    };
  }

  async login({ email, password }) {
    const user = await this.getUser(email, password);
    if (!user) {
      throw new CustomError(
        HTTP_STATUS_CODE.UNAUTHORIZED,
        "Email or password is wrong"
      );
    }
    const token = this.generateToken(user);
    await updateToken(user.id, token);
    return {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    };
  }

  async logout(id) {
    await updateToken(id, null);
  }

  async getUser(email, password) {
    const user = await findByEmail(email);
    if (!user) {
      return null;
    }
    if (!(await user?.isValidPassword(password))) {
      return null;
    }
    return user;
  }

  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      subscription: user.subscription,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    return token;
  }
}

module.exports = new AuthService();
export {};
