const { HttpError } = require("../utils/errors");

const validateSubscription = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      throw new HttpError(400, error.message);
    }
    next();
  };
};

module.exports = validateSubscription;
