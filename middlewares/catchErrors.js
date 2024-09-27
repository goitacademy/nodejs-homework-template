const catchErrors = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

const errorHandler = (err, req, res, next) => {
  res.status(500).json({ message: err.message });
};

module.exports = {
  catchErrors,
  errorHandler,
};
