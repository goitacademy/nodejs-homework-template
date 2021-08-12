const HTTP_STATUS = require('../utils/httpStatusCodes');

const validate = validator => {
  return async (req, res, next) => {
    const error = await validator(req.body);

    if (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: 'Error',
        code: HTTP_STATUS.BAD_REQUEST,
        message: error.message,
      });
      return;
    }
    next();
  };
};

module.exports = validate;