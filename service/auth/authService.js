const { repositoryUsers } = require('../../repository');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

class AuthService {
  async isUserExist(email) {
    const user = await repositoryUsers.findByEmail(email);
    return !!user;
  }

  async createUser(body) {
    const { id, name, email, role, avatarURL, verificationTokenEmail } = await repositoryUsers.create(body);
    return { id, name, email, role, avatarURL, verificationTokenEmail };
  }

  async getUser(email, password) {
    const user = await repositoryUsers.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword || !user?.isVerification) {
      return null;
    }
    return user;
  }

  getToken(user) {
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    return token;
  }

  async setToken(id, token) {
    await repositoryUsers.updateToken(id, token);
  }
}

module.exports = new AuthService();
