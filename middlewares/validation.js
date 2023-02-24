const validation = (schema, message) => {
  return (req, res, next) => {
    console.log(schema);
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      error.status = 400;
      error.message = message;

      next(error);
      return;
    }
    next();
  };
};

module.exports = validation;
