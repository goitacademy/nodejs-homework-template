const { createError } = require("../helpers");

function validateParams(schema) {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      throw createError({ status: 404, message: error.message });
    }
    next();
  };
  return fn;
}

module.exports = validateParams;
