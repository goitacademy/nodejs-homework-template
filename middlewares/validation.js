const validation = (schema) => {
  const functionValidation = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
    }
    next();
  };
  return functionValidation;
};

module.exports = validation;
