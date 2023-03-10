const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw res
      .status(409)
      .json({ status: "error", code: 409, data: { message: "Email in use" } });
  }
  const avatarURL = gravatar.url(email);
  const hachPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({
    email,
    password: hachPassword,
    subscription: "starter",
    avatar: avatarURL,
  });

  return res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription: "starter",
        avatarURL,
      },
    },
  });
};

module.exports = signup;
