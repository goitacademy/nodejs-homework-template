const { HttpCode } = require('../config/constants');

const wrapper = fn => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return result;
  } catch (err) {
    switch (err.name) {
      case 'ValidationError':
        return res.status(HttpCode.BAD_REQUEST).json({
          status: 'error',
          code: HttpCode.BAD_REQUEST,
          message: err.message,
        });

      case 'CustomError':
        return res.status(err.status).json({
          status: 'error',
          code: err.status,
          message: err.message,
        });

      default:
        next(err);
        break;
    }
  }
};

module.exports = wrapper;
