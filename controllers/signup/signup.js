const { User } = require("../../models/users");
const Conflict = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const register = async (req, res, next) => {
  const { password, email, subscription = "starter" } = req.body;

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const avatarURL = gravatar.url(email);
  await User.create({ email, password: hashPassword, avatarURL });
  try {
    res.status(201).json({
      status: "sucsess",
      code: 201,
      data: {
        email,
        subscription,
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
