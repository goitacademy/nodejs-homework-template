const bcrypt = require("bcrypt");
const gravatar = require('gravatar');
const { HttpError } = require("../../helpers");
const User = require("../../models/user.js");


const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, "Email in use");

  const hashPass = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({ 
    ...req.body,
     password: hashPass,
    avatarURL,
    });
  
  res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
  });
};

module.exports = register;