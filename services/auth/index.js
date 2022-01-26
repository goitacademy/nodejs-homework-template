import jwt from 'jsonwebtoken';
import UsersRepository from '../../repository/users';
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async isUserExist(email) {
    const user = await UsersRepository.findByEmail(email);
    return !!user;
  }

  async create(body) {
    const { id, name, email, subscription } = await UsersRepository.create(
      body,
    );
    return {
      id,
      name,
      email,
      subscription,
    };
  }

  async getUser(email, password) {
    const user = await UsersRepository.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  async updateUserSubscription(id, subscription) {
    const user = await UsersRepository.updateUserSubscription(id, subscription);
    return user;
  }

  getToken(user) {
    const { id, email } = user;
    const payload = { id, email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '8d' });
    return token;
  }

  async setToken(id, token) {
    await UsersRepository.updateToken(id, token);
  }
}

export default AuthService;