const bcrypt = require("bcrypt");
const { User } = require("../models");
const gravatar = require("gravatar")
const { HttpError, ctrlWrapper } = require("../helpers");

const resisterUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  
  if (user) {
    throw HttpError(409, "Email already in use");
  }



  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = await gravatar.url(email)
  console.log(avatarURL);
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });
  res
    .status(201)
    .json({ email: newUser.email, subscription: newUser.subscription, avatarURL });
};

module.exports = ctrlWrapper(resisterUser);
