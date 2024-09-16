const HttpError = require("../Helpers/HttpError");

const validateUser = (schema) => {
  const validate = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(404, "Помилка від Joi або іншої бібліотеки валідації"));
    }
    next();
  };
  return validate;
};
module.exports = validateUser;