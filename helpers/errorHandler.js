const { HttpCode } = require('../config/constants');

const wrapper = fn => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return result;
  } catch (error) {
    switch (error.name) {
      case 'CustomError':
        res.status(HttpCode.BAD_REQUEST).json({
          status: 'Error',
          code: HttpCode.BAD_REQUEST,
          message: error.message,
        });

        break;

      case 'ValidationError':
        res.status(error.status).json({
          status: 'Error',
          code: error.status,
          message: error.message,
        });

        break;
      default:
        next(error);

        break;
    }
  }
};

module.exports = wrapper;
