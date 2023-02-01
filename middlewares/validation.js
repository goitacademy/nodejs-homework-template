const validation = (scheme) => {
  return (req, _, next) => {
    const { error } = scheme.validate(req.body);
    if (error) {
      error.status = 400;
      return next(error);
    }
    next();
  };
};

module.exports = validation;
