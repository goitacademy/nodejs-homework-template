const { User } = require('../../models');
const { sendSuccessRes } = require('../../helpers');

const current = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id, '_id email subscription');
  sendSuccessRes(res, { data: { user } }, 200);
};

module.exports = current;
