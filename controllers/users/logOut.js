const { User } = require("../../models");

const logOut = async (req, res) => {
  const { _id } = req.user;

   await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json();
};

module.exports = logOut;
