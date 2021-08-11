const { user: service } = require('../../services');
const HTTP_STATUS = require('../../utils/httpStatusCodes');

const logout = async (req, res, next) => {
  try {
    await service.updateById(req.user._id, { token: null });
    res.status(HTTP_STATUS.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
};

module.exports = logout;