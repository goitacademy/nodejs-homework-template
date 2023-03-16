const validation = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.staus = 400;
      next(error);
      return;
    }
    next();
  };
};

module.exports = validation;
