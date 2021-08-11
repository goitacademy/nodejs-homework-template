  
const HTTP_STATUS = require('../../utils/httpStatusCodes');

const getCurrentUser = (req, res, next) => {
  res.status(HTTP_STATUS.SUCCESS).json({
    status: 'Success',
    code: HTTP_STATUS.SUCCESS,
    data: {
      id: req.user._id,
      email: req.user.email,
      subscription: req.user.subscription,
    },
  });
};

module.exports = getCurrentUser;