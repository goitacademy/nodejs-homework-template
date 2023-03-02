const joyValidation = (schema) => {
  return async (req, res, next) => {
    const { error } = await schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = joyValidation;
