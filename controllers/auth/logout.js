const { authServices } = require("../../services");

const logout = async (req, res) => {
  const { _id } = req.user;
  authServices.logout(_id);
  await res.status(204).json();
};

module.exports = logout;
