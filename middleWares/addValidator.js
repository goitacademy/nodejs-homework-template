const httpError = require("../helpers/HttpError");
const objectContactsChecker = require("../helpers/objectContactsChecker");

const addValidator = (schema) => {
  const valid = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const alertMessage = objectContactsChecker(req.body);
      next(httpError(400, alertMessage));
    }
    next();
  };
  return valid;
};

module.exports = addValidator;