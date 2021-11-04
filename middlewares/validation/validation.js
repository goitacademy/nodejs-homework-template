const validation = (schema) => {
  const validationMiddleware = (reg, _, next) => {
    const { error } = schema.validate(reg.body);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
  return validationMiddleware;
};

module.exports = validation;
