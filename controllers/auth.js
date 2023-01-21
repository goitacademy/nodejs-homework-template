const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const { HttpError } = require('../helpers');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const { JWT_SECRET } = process.env;

async function registration(req, res, next) {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, password: hashedPassword });
    const responseData = {
      user: {
        email,
        subscription: newUser.subscription,
      },
    };

    res.status(201).json({ ...responseData });
  } catch (error) {
    if (error.code === 11000) {
      throw new HttpError(409, 'Email in use');
    }
    res.status(400).json({ message: error.message });
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const storedUser = await User.findOne({ email });
  if (!storedUser) {
    throw new HttpError(401, "user don't exist");
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);
  if (!isPasswordValid) {
    throw new HttpError(401, 'password is wrong');
  }

  const payload = { id: storedUser._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 15 });
  const responseData = {
    token,
    user: {
      email: storedUser.email,
      subscription: storedUser.subscription,
    },
  };

  res.status(200).json({ ...responseData });
}

module.exports = {
  registration,
  login,
};
