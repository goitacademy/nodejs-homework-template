/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable semi */
const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = logout;
