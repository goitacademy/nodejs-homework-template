const validation = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      return next(error);
    }
    next();
  };

  return func;
};

module.exports = validation;
