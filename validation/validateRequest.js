const createError = require("../helpers/createError");

function validateRequestBody(schema, body) {
  const { error } = schema.validate(body);
  if (error) {
    if (
      error.message ===
      '"value" must contain at least one of [name, email, phone]'
    )
      error.message = "missing fields";
    throw createError(400, error.message);
  }
}

module.exports = { validateRequestBody };
