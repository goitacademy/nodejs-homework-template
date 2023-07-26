const bcrypt = require("bcryptjs");
const {
  userModel: { User },
} = require("../../models");
const gravatar = require("gravatar");
const { ctrlWrapper, HttpError } = require("../../helpers");

const registerUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email is already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { d: "monsterid" });

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201);
  res.json({ email: newUser.email, name: newUser.name });
};

module.exports = { registerUser: ctrlWrapper(registerUser) };
