const { findUserAndUpdate } = require("../../services/users");

const logout = async (req, res) => {
  const { _id } = req.user;
  await findUserAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = logout;
