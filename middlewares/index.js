const { HttpError } = require("../httpError");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(error.message);
    }
    return next();
  };
}

module.exports = {
  validateBody,
};
