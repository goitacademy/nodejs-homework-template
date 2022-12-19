const { createError } = require("../helpers");

function validateBody(schema) {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError({ status: 404, message: error.message });
    }
    next();
  };
  return fn;
}

module.exports = validateBody;
