const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { loginUser } = require('../../services/users');
const { User } = require('../../schemas/modelUser');

const JWT_SECRET = process.env.SECRET;

const controllerLoginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      });
    }

    const payload = { _id: user._id.toString() };
    const token = jwt.sign(payload, JWT_SECRET);

    await loginUser(user._id, token);
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
