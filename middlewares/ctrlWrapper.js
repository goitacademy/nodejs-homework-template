const controllerWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

const errorHandler = (err, req, res, next) => {
  if (err.status)
    res.status(err.status).json({
      message: err.message,
    });

  res.status(500).json({ message: "Internal server error" });
};

module.exports = { controllerWrapper, errorHandler };
