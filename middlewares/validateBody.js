const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(
        res.status(400).json({
          status: "error",
          code: 400,
          message: "missing fields",
        })
      );
    }

    next();
  };

  return func;
};

module.exports = validateBody;
