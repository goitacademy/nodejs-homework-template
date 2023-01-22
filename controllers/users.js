const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

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
    throw new HttpError(401, 'Email or password is wrong');
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);
  if (!isPasswordValid) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  const payload = { id: storedUser._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  await User.findByIdAndUpdate(storedUser._id, { token });

  const responseData = {
    token,
    user: {
      email: storedUser.email,
      subscription: storedUser.subscription,
    },
  };
  res.status(200).json({ ...responseData });
}

async function currentUser(req, res, next) {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
}

async function logout(req, res, next) {
  const { id } = req.user;

  await User.findByIdAndUpdate(id, { token: null });
  res.status(204).json();
}

async function updateSubscription(req, res, next) {
  const { id } = req.user;
  const { subscription } = req.body;

  if (subscription !== 'starter' && subscription !== 'pro' && subscription !== 'business') {
    throw new HttpError(400, 'Subscription must be < starter >, < pro > or < business >');
  }

  await User.findByIdAndUpdate(id, { subscription });
  res.status(201).json({ message: `Suscription updated to < ${subscription} >` });
}

module.exports = {
  registration,
  login,
  currentUser,
  logout,
  updateSubscription,
};
