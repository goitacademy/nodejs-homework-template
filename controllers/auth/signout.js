const { User } = require("../../models");

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
  // res.status(200).json({
  //   message: "logout succes",
  // });
};

module.exports = signout;
