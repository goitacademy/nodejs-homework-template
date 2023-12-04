const HttpError = require("../helpers/HttpError");

const controlWrapper = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    next(new HttpError(500, "Internal Server Error"));
  }
};

module.exports = controlWrapper;
