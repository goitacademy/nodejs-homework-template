const validation = (scheme) => {
  return (req, res, next) => {
    const { error } = scheme.validate(req.body);
    if (error) {
      error.status = 400;
      return next(error);
    }
    next();
  };
};

module.exports = validation;
