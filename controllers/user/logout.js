const { User } = require("../../models");
const { decoratorCtrl } = require("../../helpers");
const { status } = require("../../consts");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.json(status.USER_LOGOUT);
};

module.exports = decoratorCtrl(logout);
