const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var gravatar = require('gravatar');
const { v4 } = require('uuid');
const { Conflict, Unauthorized } = require('http-errors');

const { User } = require('../models/user');
const { sendMailNodemailer } = require('../helpers/index');
const { JWT_SECRET } = process.env;
const PORT = process.env.PORT || 3000;

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
    const verificationToken = v4();
    const savedUser = await User.create({
      email,
      // password: hashedPassword,
      password,
      avatarURL,
      verify: false, // ask mentor
      verificationToken,
    });
    // ask mentor why href in mail doesn't redirect
    await sendMailNodemailer({
      to: email,
      subject: 'Please confirm your email!',
      html: `<a href="127.0.0.1:${PORT}/api/auth/verify/${verificationToken}">Please, confirm your email!</a>`,
    });

    // or we can use sendgrig:
    // await sendMailSandgrid({
    //   to: email,
    //   subject: 'Please confirm your email!',
    //   html: `<a href="127.0.0.1:${PORT}/api/auth/verify/${verificationToken}">Please, confirm your email!</a>`,
    // });

    res.status(201).json({
      data: {
        user: {
          email,
          id: savedUser._id,
          subscription: savedUser.subscription,
          avatarURL: savedUser.avatarURL,
          verificationToken: savedUser.verificationToken,
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

async function verifyEmail(req, res, next) {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken: verificationToken });
  if (!user) {
    throw BadRequest(`Verify token is not valid!`);
  }

  await User.findByIdAndUpdate(
    user._id,
    {
      verify: true,
      // verificationToken: null, // ask mentor
    },
    { new: true }
  );

  return res.status(200).json({ message: 'Verification successful!' });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const storedUser = await User.findOne({ email });
  if (!storedUser) {
    throw Conflict('Email or password is not valid!');
  }

  if (!storedUser.verify) {
    throw Conflict('Email is not verified! Please check your mail box!');
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);
  if (!isPasswordValid) {
    throw Conflict('Email or password is not valid!');
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
  verifyEmail,
  login,
  logout,
};
