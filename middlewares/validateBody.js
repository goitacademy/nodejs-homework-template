const errorMessage = require("../helpers/errorMessage.js");

const validateBody = (schema) => {
  const validateFunction = (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (req.method === "PUT") {
      if (Object.keys(req.body).length === 0) {
        throw errorMessage(400, "missing fields");
      }
    }
    if (req.method === "PATCH") {
      if (Object.keys(req.body).length === 0) {
        throw errorMessage(400, "missing field favorite");
      }
    }
    if (typeof error !== "undefined") {
      next(errorMessage(400, error.message));
    }

    next();
  };

  return validateFunction;
};

module.exports = validateBody;
