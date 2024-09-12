const User = require('../../models/user');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw res.status(409).json({ message: 'Email in use' });
    }
    const avatarURL = gravatar.url(email);
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, avatarURL ,password: hashPassword });

    console.log(`newUser`, newUser);
    console.log(`user`, req.body.name);
    console.log(`avatar===========`, avatarURL)

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL,
      },
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

module.exports = register;
