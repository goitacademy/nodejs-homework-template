function validateQuery(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      error.status = 400;
      next(error);
      return;
    }
    next();
  };
}

module.exports = validateQuery;
