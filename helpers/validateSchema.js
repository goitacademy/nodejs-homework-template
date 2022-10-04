const { createError } = require("./createError");

function validateSchema(schema, target) {
  const { error } = schema.validate(target);
  //
  if (error) {
    throw createError(400, error.message);
  }
}

module.exports = validateSchema;
