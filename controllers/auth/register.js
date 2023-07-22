const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { HttpError, ctrlWrapper } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email have already been used");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });
  res.status(201).json({
    email: newUser.email,
  });
};
module.exports = {
  register: ctrlWrapper(register),
};
