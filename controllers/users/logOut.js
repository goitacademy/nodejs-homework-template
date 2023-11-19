const { User } = require("../../models");

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" }); //, { new: true }
  res.status(204);
  res.json({
    message: "Logout success",
  });
};

module.exports = logOut;
