const validator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = 'missing required name field';
      next(error);
      return;
    }

    next();
  };
};

module.exports = { validator };
