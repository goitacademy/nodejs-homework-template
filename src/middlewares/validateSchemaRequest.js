function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "Invalid request data",
        code: 400,
        message: error.message,
      });
    }
    next();
  };
}

module.exports = validateSchema;
