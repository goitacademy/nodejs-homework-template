const HttpError = require('../helpers/HttpError');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthService {
  async authenticate(token) {
    const { SECRET_KEY } = process.env;
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    return user;
  }

  async register(body) {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...body,
      password: hashedPassword,
    });
    return newUser;
  }

  async login({ email, password }) {
    const { SECRET_KEY } = process.env;
    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401, 'Email or password is invalid');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw HttpError(401, 'Email or password is invalid');
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: '24h',
    });
    await User.findByIdAndUpdate(user._id, { token });

    return token;
  }

  async logout({ _id }) {
    const response = await User.findByIdAndUpdate(_id, { token: null });
    return response;
  }

  async update(id, body = {}) {
    const response = await User.findByIdAndUpdate(id, body, { new: true });
    return response;
  }
}

module.exports = new AuthService();
