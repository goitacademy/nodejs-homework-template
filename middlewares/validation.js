const validation = (scheme) => {
  return (req, res, next) => {
    const { error } = scheme.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required field";
      next(error);
    }
    next();
  };
};

module.exports = validation;