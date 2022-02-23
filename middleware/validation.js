const validation = (schema) => {
  const func = (req, res, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };

  return func;
};

module.exports = validation;
