const validation = (schema, message) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = message || error.message;
      next(error);
    }
    next();
  };
};

module.exports = validation;
