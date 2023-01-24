const { User } = require("../../db/userModel");
const { HttpError } = require("../../helpers/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const storedUser = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, storedUser.password);
    if (!storedUser || !isPasswordValid) {
      return next(HttpError(401, "Email or password is wrong"));
    }
    const payload = { id: storedUser._id };
    const token = jwt.sign(payload, JWT_SECRET);

    await User.findByIdAndUpdate(storedUser._id, { token });

    return res.json({
      token,
      user: {
        email,
        subscription: storedUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
};
