const { User } = require("../../models");
const { sendSuccessResponse } = require("../../utils");

const current = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id, "_id email subscription");

  sendSuccessResponse(res, { data: { user } }, 200);
};

module.exports = current;
