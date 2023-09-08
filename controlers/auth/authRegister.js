const bcrypt = require('bcrypt');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');

const { User } = require('../../models/user.models');
const { catchAsync } = require('../../utils');
const Email = require('../../services/emailService');

const register = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict('Email in use!');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });

    try {
      await new Email(user, 'localhost:3000').sendHello();
    } catch (error) {
      console.log(error);
    };

    res.status(201).json({
      user: {
        email: newUser.email,
        subsсription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = register;