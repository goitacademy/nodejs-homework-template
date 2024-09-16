const HttpError = require("../helpers/HttpError.js");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації");
    }
    next();
  };
  return func;
};

module.exports = validateBody;
