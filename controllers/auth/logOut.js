const { logOut } = require("../../servises/user");

const logOutController = async (req, res) => {
  const { _id } = req.user;

  await logOut(_id);

  res.status(204).json("");
};

module.exports = {
  logOut: logOutController,
};
