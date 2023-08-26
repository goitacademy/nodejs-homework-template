const errorMessage = require("../helpers/errorMessage.js");

const validateBody = (contactsScheme) => {
  const validateFunction = (req, _, next) => {
    const { error } = contactsScheme.validate(req.body);

    if (Object.keys(req.body).length === 0) {
      throw errorMessage(400, "missing fields");
    }

    if (typeof error !== "undefined") {
      next(errorMessage(400, error.message));
    }
    next();
  };

  return validateFunction;
};

module.exports = validateBody;
