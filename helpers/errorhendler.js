const { HttpCode } = require("../config/constants");

const wrapper = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return result;
  } catch (error) {
    switch (error.name) {
      case "ValidationError":
        res.status(HttpCode.BAD_REQUEST).json({
          status: "error",
          code: HttpCode.BAD_REQUEST,
          message: "missing required name field",
        });
        break;
      case "CustomError":
        res.status(error.status).json({
          status: "error",
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
