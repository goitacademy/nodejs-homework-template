import usersRepository from "../../repository/users/index";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async isUserExist(email) {
    const user = await usersRepository.findByEmail(email);
    return !!user;
  }

  async create(body) {
    const { id, email, password, subscription } =
      await usersRepository.createNewUser(body);
    return { id, email, password, subscription };
  }

  async getUser(email, password) {
    const user = await usersRepository.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    return !isValidPassword ? null : user;
  }

  getToken(user) {
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    return token;
  }

  async setToken(id, token) {
    await usersRepository.updateToken(id, token);
  }

  async getUserById(id) {
    const user = await usersRepository.findById(id);
    return user;
  }
}
const authService = new AuthService();
export default authService;
