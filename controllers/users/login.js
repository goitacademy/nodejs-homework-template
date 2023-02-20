const { User } = require('../../models/users');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const id = req.userId;
  try {
    const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '24h' });

    const result = await User.findByIdAndUpdate(id, { token }, { new: true });

    const { email, subscription } = result;

    res.status(200).json({
      status: 'success',
      code: 200,
      token,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
