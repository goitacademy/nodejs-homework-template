const { HttpError } = require("../helpers/");
const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const field = error.details[0].path[0];
      const errorMessages = {
        phone: error.message,
        email: error.message,
        default: "missing required name field",
      };
      throw HttpError(400, errorMessages[field] || errorMessages.default);
    }
    next();
  };
  return func;
};

module.exports = validateBody;
