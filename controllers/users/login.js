const { User } = require('../../models');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized(401, 'Email or password invalid');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Unauthorized(401, 'Email or password invalid');
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '10h' });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token: token,
      user: {
        email: email,
        subscription: 'starter',
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
