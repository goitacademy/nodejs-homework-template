const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const avatarURL = gravatar.url(email);

    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({
        status: "error",
        code: 409,
        message: `User with ${email} already exist`,
      });
      return;
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({ name, email, password: hashPassword, avatarURL });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          name,
          avatarURL,
          subscription: "starter",
        },
      },
    });
  } catch {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
};
module.exports = signup;
