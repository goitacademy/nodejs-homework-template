import jwt from "jsonwebtoken";
import Users from "../../repository/users";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async create(body) {
    const { id, name, email, role, owner } = await Users.createUser(body);
    return {
      id,
      name,
      email,
      role,
      owner,
    };
  }

  getToken(user) {
    const { id } = user;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1w" });
    return token;
  }

  async getUser(email, password) {
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  async isUserExist(email) {
    const user = await Users.findByEmail(email);
    return !!user;
  }

  async setToken(id, token) {
    await Users.updateToken(id, token);
  }
}

export default AuthService;
