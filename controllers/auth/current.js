const { User } = require("../../models");
const { sendSuccessRes } = require('../../helpers')

const current = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findById(_id, "_id email subscription");

  sendSuccessRes(res, {result});
};

module.exports = current