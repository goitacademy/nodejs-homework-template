const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
// npm i gravatar  для тимчасової аватарки юзеру

const { User } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  // хешуємо пароль npm i bcryptjs
const avatarURL = gravatar.url(email);

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

 res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
