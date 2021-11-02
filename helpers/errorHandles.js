const { HttpCode, ResponseStatus } = require('../config/constants');

const wrapper = fn => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return result;
  } catch (err) {
    const errorBody = { status: ResponseStatus.ERROR, message: err.message };

    switch (err.name) {
      case 'ValidationError':
        return res.status(HttpCode.BAD_REQUEST).json({
          code: HttpCode.BAD_REQUEST,
          ...errorBody,
        });

      case 'CustomError':
        return res.status(err.status).json({
          code: err.status,
          ...errorBody,
        });

      default:
        next(err);
        break;
    }
  }
};

module.exports = wrapper;
