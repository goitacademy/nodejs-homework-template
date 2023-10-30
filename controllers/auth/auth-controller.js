const { User } = require("../../models");

const { HttpError } = require("../../helpers");

const { controllerWrapper } = require("../../decorators");

const signup = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ username: user.username, email: user.email });
};

module.exports = { signup: controllerWrapper(signup) };
