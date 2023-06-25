const HttpError = require("../helpers/httpError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (!Object.keys(req.body).length) {
      next(HttpError(400, "missing fields"));
    } else {
      const { error } = schema.validate(req.body);
      if (error) {
        const field = error.message.split(" ")[0].slice(1, -1);
        let message;
        switch (error.details[0].type) {
          case "any.required":
            message = `missing required ${field} field`;
            break;
          case "string.empty":
            message = `${field} field is empty`;
            break;
          case "string.base":
          case "string.email":
            message = `${field} field is invalid`;
            break;
          default:
            message = error.message;
        }
        next(HttpError(400, message));
      }
    }
    next();
  };
  return func;
};

module.exports = validateBody;
