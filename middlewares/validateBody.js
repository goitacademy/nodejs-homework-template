const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    // { abortEarly: false } - це опція, яка вказує Joi не припиняти перевірку при першій знайденій помилці
    const { error } = schema.validate(req.body, { abortEarly: false });

    // Перевірка на пусте body
    if (Object.keys(req.body).length === 0) {
      return next(
        HttpError(400, "The request body is empty. Please provide data.")
      );
    }

    if (error) {
      const errorMessages = error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(HttpError(400, errorMessages));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
