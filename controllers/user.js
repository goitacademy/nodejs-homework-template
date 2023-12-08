const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const HttpError = require('../httpErrors/errors');
const { User } = require('../models/userSchema');

const secret = process.env.SECRET_KEY;

async function register(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user) {
      throw HttpError(409, 'Email in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    const id = newUser._id;

    console.log('Current value of SECRET_KEY before jwt.sign:', secret);

    const token = jwt.sign({ id }, secret, { expiresIn: '20h' });
    await updateToken(id, token);

    res.status(201).json({
      token,
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new HttpError(401, 'Email or password is wrong!');
    }

    const compareResult = await bcrypt.compare(password, user.password);

    if (!compareResult) {
      throw new HttpError(401, 'Email or password is wrong!');
    }

    const id = user._id;
    const token = jwt.sign({ id }, secret, { expiresIn: '20h' });
    await updateToken(id, token);

    res.status(201).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const { _id } = req.user || {};

    if (!_id) {
      throw new HttpError(401, 'Unauthorized.');
    }

    await User.findByIdAndUpdate(_id, { token: '' });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function current(req, res, next) {
  try {
    const { email, subscription } = req.user || {};

    if (!email || !subscription) {
      throw new HttpError(401, 'Unauthorized.');
    }

    res.json({
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function updateToken(id, token) {
  try {
    await User.findByIdAndUpdate(id, { token });
  } catch (error) {
    throw new HttpError(500, 'Internal Server Error!');
  }
}

module.exports = {
  register,
  login,
  logout,
  current,
};
