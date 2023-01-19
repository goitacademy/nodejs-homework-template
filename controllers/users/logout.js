const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByid(_id, { token: null });

  res.sttatus(204).json();
};

module.exports = logout;
