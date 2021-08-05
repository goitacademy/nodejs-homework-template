const { user: service } = require('../../services');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await service.getOne({ email });
    if (!user || !user.comparePassword(password)) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Email or password is wrong',
      });
      return;
    }
    const { SECRET_KEY } = process.env;
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY);
    await service.updateById(user._id, { token });
    res.json({
      status: 'OK',
      code: 200,
      data: {
        token: token,
        user: { email: user.email, subscription: user.subscription },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
