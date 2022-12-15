const validationParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      error.status = 400;
      next(error);
      return;
    }
    next();
  };
};

module.exports = validationParams;
