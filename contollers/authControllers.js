const { User } = require("../models/userModel");
const controllerWrapper = require("../helpers/controllerWrapper");

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  res.json({
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
  });
};

module.exports = {
  register: controllerWrapper(register),
};
