const { User, schemas } = require('../../models/user');
const { createError } = require('../../helpers');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const signup = async (req, res, next) => {
  try {
    const { error } = schemas.register.validate(req.body);
    if (error) {
      throw createError(400, 'Email or password invalid');
    }
    const { email, password } = req.body;
    const result = await User.findOne({ email });
    if (result) {
      throw createError(409, 'Email in use');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    await User.create({ email, password: hashPassword, avatarURL });

    res.status(201).json({
      user: {
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;