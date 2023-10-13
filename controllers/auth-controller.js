const HttpError = require("../helpers/HttpError");

const { User } = require("../models/User");

const ctrlWrapper = require("../decorators/ctrlWrapper");

const signup = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    email: user.email,
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
};
