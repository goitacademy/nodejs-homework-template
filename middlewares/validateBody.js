const { HttpError } = require("../helpers");
const { Schema } = require("mongoose");

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        // Якщо є помилка валідації, відправте HTTP помилку
        return next(HttpError(400, error.message));
      }

      const cat = new Cat();
      await cat.save();

      error = cat.validateSync();
      if (error && error.errors["name"]) {
        return next(HttpError(400, error.errors["name"].message));
      }

      next();
    } catch (err) {
      return next(HttpError(500, "Internal Server Error"));
    }
  };

  return func;
};

module.exports = validateBody;
