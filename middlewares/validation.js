const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(res.status(400).json({ status: error.details }));
      // error.status = 400;
      // next(error);
    }
    next();
  };
};

module.exports = validation;
