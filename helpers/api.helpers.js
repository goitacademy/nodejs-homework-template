const asyncWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

const errorHandler = (error, req, res, next) => {
  if (error.status && error.message) {
    return res.status(error.status).json({ message: error.message });
  }
  if (error.name === "CastError") {
    return res.status(400).json({
      message: error.message,
    });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: error.message,
    });
  }
  res.status(500).json({ message: "Server Internal Error" });
};

const requestError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = {
  asyncWrapper,
  errorHandler,
  requestError,
};
