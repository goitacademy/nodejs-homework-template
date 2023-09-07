const { createError } = require("../helpers"); // Підключення модуля createError з папки helpers

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body); // Валідація тіла запиту за допомогою заданої схеми
    if (error) {
      next(createError(400, error.message)); // Якщо виникає помилка валідації
    }
    next(); // Передача керування до наступної middleware
  };
  return func; // Повернення функції валідації
};

module.exports = validateBody; // Експорт функції validateBody для використання в інших файлів
