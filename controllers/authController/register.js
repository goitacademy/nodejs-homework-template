const { User } = require("../../db/userModel");
const { HttpError } = require("../../helpers/index");
const bcrypt = require("bcrypt");

async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const savedUser = await User.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      user: {
        email,
        subscription: savedUser.subscription,
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      next(HttpError(409, "Email in use"));
    }
    res.json({ message: error.message });
  }
}
module.exports = {
  register,
};
