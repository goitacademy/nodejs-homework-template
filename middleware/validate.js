const { createError } = require("../helpers");

function validate(schema) {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) throw createError({ status: 400, message: error.message });

    next();
  };
  return func;
}

module.exports = validate;
