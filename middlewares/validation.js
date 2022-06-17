const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      error.code = error.status;
      next(error);
    }
    next();
  };
};

module.exports = validation;
