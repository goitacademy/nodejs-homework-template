const HttpError = require("../helpers/HttpError");

const ValidateBodyContact = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log("error validate")
      throw HttpError(400, error.message || "Bad request");
    }
    next();
  };
  return func;
};

module.exports = ValidateBodyContact;
