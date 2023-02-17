const userAuthValidation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Error",
        code: 400,
        message: error.message,
      });
      next(error);
    }
    next();
  };
};

module.exports = userAuthValidation;
