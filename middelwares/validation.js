const validation = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 400;
      next();
      return;
    }
    next();
  };
};

module.exports = validation;
