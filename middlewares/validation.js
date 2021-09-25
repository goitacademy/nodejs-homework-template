const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
        code: 400,
      });
      return;
    }
    next();
  };
};

module.exports = validation;
