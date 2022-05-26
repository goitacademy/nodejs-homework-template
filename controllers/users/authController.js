const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const sendEmail = require('../../helpers/sendEmail');
const SECRET_KEY = 'jsonwebtoken';

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const error = new Error('Email in use');
    error.status = 409;
    throw error;
  }

  const avatarURL = gravatar.url(email);
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const verificationToken = uuidv4();
  await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: 'Подтверждения email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email,
      avatarURL,
      subscription: 'starter',
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify) {
    const error = new Error('User not verified or Email or password is wrong');
    error.status = 401;
    throw error;
  }
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    const error = new Error('Email or password is wrong');
    error.status = 401;
    throw error;
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json({ message: 'successfully logged out' });
};

module.exports = { signup, login, logout };
