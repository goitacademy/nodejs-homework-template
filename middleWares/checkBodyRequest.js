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
    if (Object.keys(req.body)[0] !== "favorite") {
      return next(httpError(400, "missing field favorite"));
    }
    return next();
  };
}

function checkIfBodyStatusExists() {
  return (req, res, next) => {
    const fieldsOfContactToUpdate = Object.values(req.body);
    if (
      !req.body ||
      fieldsOfContactToUpdate.length === 0 ||
      Object.keys(req.body)[0] !== "favorite"
    ) {
      return next(httpError(400, "missing field favorite"));
    }
    return next();
  };
}

module.exports = {
  validateBody,
  checkIfBodyExists,
  checkIfBodyStatusExists,
};
