const { User } = require('../models/user');
const { Conflict, Unauthorized } = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
var gravatar = require('gravatar');

async function register(req, res, next) {
  const { email, password } = req.body;
  // const salt = await bcrypt.genSalt(); // moved to the models user
  // const hashedPassword = await bcrypt.hash(password, salt); // moved to the models user

  var avatarURL = gravatar.url(
    email,
    { s: '200', r: 'pg', d: 'robohash' }, // d: 'robohash': default image with robot
    false
  );
  try {
    const savedUser = await User.create({
      email,
      // password: hashedPassword,
      password,
      avatarURL,
    });
    res.status(201).json({
      data: {
        user: {
          email,
          id: savedUser._id,
          subscription: savedUser.subscription,
          avatarURL: savedUser.avatarURL,
        },
      },
    });
  } catch (error) {
    if (error.message.includes('E11000 duplicate key error')) {
      console.log('error while saving user', error.message, error.name);
      throw Conflict(`User with email <${email}> already exists!`);
    }
    throw error;
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const storedUser = await User.findOne({ email });
  if (!storedUser) {
    throw Conflict('email is not valid'); // TODO change email or password is not valid
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);
  if (!isPasswordValid) {
    throw Conflict('password is not valid'); // TODO change email or password is not valid
  }
  const payload = { id: storedUser._id };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h', // examples: "1m", "1s",
  });
  return res.status(200).json({
    data: {
      token,
      user: {
        email,
        id: storedUser._id,
        subscription: storedUser.subscription,
        avatarURL: storedUser.avatarURL,
      },
    },
  });
}

async function logout(req, res, next) {
  console.log('function logout...');
  const authHeader = req.headers.authorization || '';
  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') {
    throw Unauthorized('token type is not valid');
  }
  if (!token) {
    throw Unauthorized('no token provided');
  }

  const { id } = jwt.verify(token, JWT_SECRET);

  const user = await User.findByIdAndUpdate(id, { token: null }, { new: true });
  console.log('user: ', user);
  return res.status(204).json({ message: 'No Content' });
}

module.exports = {
  register,
  login,
  logout,
};
