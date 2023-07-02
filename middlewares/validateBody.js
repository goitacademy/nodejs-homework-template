const { HttpErrors } = require("../helpers"); // Підключення модуля HttpErrors з папки helpers

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body); // Валідація тіла запиту за допомогою заданої схеми

    if (error) {
      next(HttpErrors(400, error.message)); // Якщо виникає помилка валідації, створюється об'єкт помилки HttpErrors зі статусом 400 та повідомленням про помилку
    }

    next();
  };

  return func; // Повернення функції валідації
};

module.exports = validateBody;
