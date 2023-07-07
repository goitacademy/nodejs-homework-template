const { ctrlWrapper } = require("../helpers");
const { User } = require("../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json({message: "Logout success"})
};

module.exports = ctrlWrapper(logout);
