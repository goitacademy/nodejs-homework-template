const HttpError = require("../error/error.js");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      throw new HttpError(400, error.message);
      
    }

    next();
  };
};

module.exports = validate;
