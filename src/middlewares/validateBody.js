const validateBody = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next({
        status: 400,
        message: `Missing required ${error.details[0].context.label} field`,
      });
    }

    next();
  };
};

module.exports = { validateBody };
