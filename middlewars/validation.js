const validation = (schema) => {
  return (req, res, next) => {
    const { body } = req;
    const { error } = schema.validate(body);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};
module.exports = validation;
