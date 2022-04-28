const jwt = require("jsonwebtoken");
const Users = require("../../repository/users");
const { HTTP_STATUS_CODE } = require("../../libs/constant");
const { CustomError } = require("../../middleware/error-handler");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async create(body) {
    const user = await Users.findByEmail(body.email);
    if (user) {
      throw new CustomError(HTTP_STATUS_CODE.CONFLICT, "User already exists");
    }
    const newUser = await Users.create(body);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar,
    };
  }

  async login({ email, password }) {
    const user = await this.getUser(email, password);
    if (!user) {
      throw new CustomError(
        HTTP_STATUS_CODE.UNAUTHORIZED,
        "Invalid credentials"
      );
    }
    const token = this.generateToken(user);
    await Users.updateToken(user.id, token);
    return { token };
  }

  async logout(id) {}

  async getUser(email, password) {
    const user = await Users.findByEmail(email);

    if (!user) {
      return null;
    }

    if (!(await user?.isValidPassword(password))) {
      return null;
    }

    return user;
  }

  generateToken(user) {
    const payload = { id: user.id, name: user.name, role: user.role };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    return token;
  }
}

module.exports = new AuthService();
