const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { HttpError } = require("../../helpers/index");

const register = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashdPassword = await bcrypt.hash(password, salt);
  try {
    const savedUser = await User.create({ email, password: hashdPassword });
    res.status(201).json({
      user: {
        email,
        subscription: savedUser.subscription,
      },
    });
  } catch (err) {
    if (err.message.includes("E11000 duplicate key error"))
      throw HttpError(409, "Email in use");
  }
};

module.exports = register;
