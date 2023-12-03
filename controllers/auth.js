const { User } = require("../models/user");
// const { ctrlWrapper } = require("../helpers");

const register = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      email: newUser.email,
      name: newUser.name,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  // : ctrlWrapper(register),
};
