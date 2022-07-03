const { Conflict } = require("http-errors");
// const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const avatarURL = gravatar.url(email);

  const newUser = new User({ email, subscription, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "Created",
    code: 201,
    data: {
      user: {
        email,
        password,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = register;
