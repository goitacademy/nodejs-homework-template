const { User } = require("../../models");

const { HttpError } = require("../../helpers");

const { controllerWrapper } = require("../../decorators");

const { hashPassword } = require("../../hash");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `${email} already in use`);
  }

  const newUser = await User.create({
    ...req.body,
    password: hashPassword(password),
  });

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

module.exports = { signup: controllerWrapper(signup) };
