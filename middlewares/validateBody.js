const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      let message;
      if (error.message.includes('"phone" with value')) {
        message =
          "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +";
      } else if (error.message.includes('"email" with value')) {
        message = "It's Not a valid email! Please check your input";
      } else if (error.message === '"favorite" is required') {
        message = "missing field favorite";
      } else {
        message = error.message;
      }
      next(HttpError(400, message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;