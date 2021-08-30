const validation = (schema) => {
  const validationMiddleware = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "error.message",
      });
    }
    next();
  };

  return validationMiddleware;
};

module.exports = validation;
