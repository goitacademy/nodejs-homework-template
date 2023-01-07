const { httpError } = require("../helpers/helpers");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(httpError(400, error.message));
    }
    next();
  };
}

function checkIfBodyExists() {
  return (req, res, next) => {
    const fieldsOfContactToUpdate = Object.values(req.body);
    if (!req.body || fieldsOfContactToUpdate.length === 0) {
      return next(httpError(400, "missing fields"));
    }
    return next();
  };
}

module.exports = {
  validateBody,
  checkIfBodyExists,
};
