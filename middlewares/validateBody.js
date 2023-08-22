const ErrorMessage = require("../helpers/errorMessage.js");

const validateBody = (contactsScheme) => {
  const validateFunction = (req, _, next) => {
    const { error } = contactsScheme.validate(req.body);

    if (typeof error !== "undefined") {
      next(ErrorMessage(400, error.message));
    }
    next();
  };

  return validateFunction;
};

module.exports = validateBody;
