const { HttpError } = require("../httpError");

function validateBody(schema) {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    return next();
  };
}

module.exports = {
  validateBody,
};
