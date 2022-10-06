const bcrypt = require('bcryptjs');

const { User } = require('../../models/user');
const { createError } = require('../../errors');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, 'Email already exist');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ email, password: hashPassword });
    res.status(201).json({
      email: result.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
