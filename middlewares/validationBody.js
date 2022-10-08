const validationBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      // error.message = "missing field favorite";
      error.status = 400;
      next(error);
      return;
    }
    next();
  };
};

module.exports = validationBody;
