const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { loginUser } = require('../../services/users');

const JWT_SECRET = process.env.SECRET;

const controllerLoginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email);
    const isPassword = await bcrypt.compare(password, user.password);

    if (!user || !isPassword) {
      return res.json({
        status: 'Unauthorized',
        code: 401,
        message: 'Email or password is wrong',
      });
    }

    const payload = { _id: user._id };
    const token = jwt.sign(payload, JWT_SECRET);

    res.json({
      status: 'success',
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

module.exports = { controllerLoginUser };
