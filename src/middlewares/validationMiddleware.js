const { httpError } = require("../helpers");

const validateId = () => {
  return async (req, res, next) => {
    if (req.params.contactId.length !== 24)
      return next(
        httpError(
          400,
          "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"
        )
      );
    next();
  };
};

const validateContactBody = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(httpError(400, error.message));
    }

    if (Object.keys(req.body).length === 0)
      return next(httpError(400, "missing fields"));
    next();
  };
};

const validateFavorite = (schema) => {
  return async (req, res, next) => {
    req.body.favorite ?? next(httpError(400, "missing field favorite"));

    const { error } = schema.validate(req.body);
    if (error) {
      return next(httpError(400, error.message));
    }
    next();
  };
};

module.exports = {
  validateId,
  validateContactBody,
  validateFavorite,
};
