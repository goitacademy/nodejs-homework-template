const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.startus = 400;
      next(error);
    }
    next();
  };
};

module.exports = validation;
