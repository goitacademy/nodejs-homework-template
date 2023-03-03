const validation = (schema, message) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      error.status = 400;
      error.message = message || error.details[0].message;

      next(error);
      return;
    }
    next();
  };
};

module.exports = validation;
