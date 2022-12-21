function validateSchema(schema) {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        status: "Invalid request data",
        code: 400,
        message: validationResult.error.message,
      });
    }
    next();
  };
}

module.exports = validateSchema;
