const { User } = require("../models/user");
// const RequestError = require("../helpers/RequestError");

const registration = async (req, res, _) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

module.exports = { registration };
