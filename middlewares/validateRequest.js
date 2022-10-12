const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next({
        status: "error",
        code: 400,
        message: `Validate error`,
        data: "Validate error",
      });
    }
    next();
  };
};

module.exports = {
  validateRequest,
};
