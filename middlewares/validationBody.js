const validationBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (
      value.name === undefined &&
      value.email === undefined &&
      value.phone === undefined
    ) {
      error.status = 400;
      error.message = "missing fields";
      next(error);
    }

    next();
  };
};


module.exports = validationBody