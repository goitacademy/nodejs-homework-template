const validateMiddleware = validator => {
  return (req, res, next) => {
    const error = validator(req.body);
    if (error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: error.message,
      });
    }
    next();
  };
};

module.exports = validateMiddleware;
