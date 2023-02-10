const jwt = require("jsonwebtoken");

const HttpError = require("../../helpers/HttpError.js");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new HttpError(400, error.message));
    }
    return next();
  };
}

module.exports = {validateBody};