const { HttpError } = require("../helpers/HttpError");

const validationBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }
    next();
  };
};

module.exports = {
  validationBody,
};
