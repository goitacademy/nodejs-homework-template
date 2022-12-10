const validationConstructor = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validation(req.body);
    if (error) {
      error.status = 400;
      next(error);
      return;
    }
    next();
  };
};

module.exports = validationConstructor;
