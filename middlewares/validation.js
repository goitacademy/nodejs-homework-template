const validation = (schema) => {
  const validationMiddleware = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const postError = new Error(error.message);
      postError.status = 400;
      next(postError);
    }
    next();
  };
  return validationMiddleware;
};

module.exports = validation;
