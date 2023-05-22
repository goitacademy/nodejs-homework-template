const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const User = require("../../models/user");
const { HttpError } = require("../../helpers/index");

const register = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashdPassword = await bcrypt.hash(password, salt);
  const avatar = gravatar.url(email, { protocol: "http" });
  console.log("avatar :", avatar);
  try {
    const savedUser = await User.create({
      email,
      password: hashdPassword,
      avatarURL: avatar,
    });
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
