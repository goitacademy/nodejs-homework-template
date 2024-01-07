// validateBody.js
const HTTPError = require("../helpers/HTTPError");

module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HTTPError(400, "Validation error")); // Повертаємо помилку
    } else {
      next();
    }
  };
};


