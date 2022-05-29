const createError = require("http-errors");

const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }
    next();
  };
};

module.exports = validateSchema;
