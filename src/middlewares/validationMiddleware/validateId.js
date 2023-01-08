const { httpError } = require("../../helpers");

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

module.exports = { validateId };
