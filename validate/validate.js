const validate = (contactSchema) => {
  return (req, res, next) => {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = validate;
