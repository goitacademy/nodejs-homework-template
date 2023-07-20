const validationStatusBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (value.favorite === undefined) {
      error.status = 400;
      error.message = "missing field favorite";
      next(error);
    }

    next();
  };
};

module.exports = validationStatusBody;
