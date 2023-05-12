const validBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };

  return func;
};

module.exports = validBody;
