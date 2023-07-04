const bcrypt = require("bcryptjs");
const { generateToken } = require("../../helpers");
const User = require("../../models/user.js");
const { HttpError } = require("../../helpers");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new HttpError(400, "Validation error");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new HttpError(401, "Email is wrong");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpError(401, "Password is wrong");
    }

    const token = generateToken(user._id);

    user.token = token;
    await user.save();
    console.log(`User with email: ${email} has logged in`.success);
    res.status(200).json({ message: `Logged in`, user });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
