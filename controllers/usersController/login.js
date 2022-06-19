const { User } = require('../../models');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const authentificationUser = await User.findOne({ email });
    if (!authentificationUser || !authentificationUser.comparePassword(password)) {
      throw new Unauthorized(`Email or password is wrong`);
    }

    const payload = {
      id: authentificationUser._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    await User.findByIdAndUpdate(authentificationUser._id, { token });
    return res.json({
      status: 'success',
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = loginUser;
