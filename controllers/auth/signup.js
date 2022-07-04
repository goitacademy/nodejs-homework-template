const bcrypt = require("bcryptjs");
const { User } = require("../../models/userSchema");
const { createError } = require("../../helpers");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: {
        email: result.email,
        name: result.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
