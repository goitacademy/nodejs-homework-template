const validation = (schema, message) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = message;
      next(error);
    }
    next();
  };
};

module.exports = validation;
