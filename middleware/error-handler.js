class CustomeError extends Error {
  constructor(message, statusCode, name = "AppError") {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "error" : "fail";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const wrapper = (fn) => async (req, res, next) => {};

module.exports = { wrapper };
