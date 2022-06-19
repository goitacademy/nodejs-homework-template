const createError = require("http-errors");

const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw createError(400, error.message);
    }
    next();
  };
};

module.exports = validateSchema;
