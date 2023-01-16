const { UpdateStatusError, ValidationError } = require("./errors");

const tryCatchWrapper = (enpointFn) => {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};

const errorHandler = (error, req, res, next) => {
  if (error instanceof UpdateStatusError || error instanceof ValidationError) {
    console.log(error.message);
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(500).json({ message: error.message });
};

module.exports = {
  tryCatchWrapper,
  errorHandler,
};
