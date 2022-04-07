const { User } = require('../../models');
const { HTTP_STATUS_CODE, STATUS } = require('../../helpers/constants.js');

const logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });

  res.status(HTTP_STATUS_CODE.NO_CONTENT).json({
    status: STATUS.OK,
    code: HTTP_STATUS_CODE.NO_CONTENT,
  });
};

module.exports = logout;
