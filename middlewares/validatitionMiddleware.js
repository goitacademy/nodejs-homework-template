const HttpError = require("../helpers/HttpError.js");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      throw HttpError(404, error.message);
    }

    next();
  };
};

module.exports = validate;
