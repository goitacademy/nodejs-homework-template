const validationId = (schema) => {
  return (req, res, next) => {
    const { id } = schema.validate(req.params);
    const { error } = schema.validate(req.body);
    if (id) {
      error.status = 400;
      next(error);
      return;
    }
    next();
  };
};

module.exports = validationId;
