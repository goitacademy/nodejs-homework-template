const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  return (req, res, next) => {
    const response = schema.validate(req.body, { abortEarly: false });
    let message = "";

    if (typeof response.error !== "undefined") {
      response.error.details.forEach((err, index) => {
        if (index === 0) {
          message += err.message;
        } else {
          message += ", " + err.message;
        }
      });
      next(HttpError(400, message));
    }
    next();
  };
};

module.exports = validateBody;
