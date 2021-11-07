const validation = (schema) => {
  const validationMiddleware = (req, _, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };

  return validationMiddleware;
};

module.exports = validation;
