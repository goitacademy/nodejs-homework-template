const HttpError = require("../helpers/HttpError");

const controlWrapper = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

module.exports = controlWrapper;
