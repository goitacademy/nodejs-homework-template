const { HTTP_STATUS_CODE } = require("../libs/constant");

class CustomError extends Error {
  constructor(statusCode, message, name = "AppError") {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "error" : "fail";
    this.name = name;
    Error.captureStackTrace(this, this.constructor);
  }
}

const wrapper = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return result;
  } catch (error) {
    switch (error.name) {
      case "ValidationError":
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
          status: "error",
          code: HTTP_STATUS_CODE.BAD_REQUEST,
          message: error.message,
        });
        break;
      case "AppError":
        res.status(error.statusCode).json({
          status: error.status,
          code: error.statusCode,
          message: error.message,
        });
        break;
      default:
        next(error);
        break;
    }
  }
};

module.exports = { wrapper, CustomError };
