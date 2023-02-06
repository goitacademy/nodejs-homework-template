const createError = require("../../helpers/createError");

function validateRequestBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(createError(400, error.message));
    }
    next();
  };
}

module.exports = validateRequestBody;
