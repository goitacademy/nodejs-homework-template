const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      res.json({
        status: "error",
        code: 400,
        message: "missing fields",
      });
      next(error);
      return;
    }
    next();
  };
};

module.exports = validation;
