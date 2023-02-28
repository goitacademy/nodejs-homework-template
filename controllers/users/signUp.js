const { User } = require('../../models/users');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email);

  try {
    const hashPswrd = bcrypt.hashSync(password, 10);

    const result = await User.create({ email, password: hashPswrd, avatarURL });
    const { subscription, email: eml } = result;

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: {
          email: eml,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;
