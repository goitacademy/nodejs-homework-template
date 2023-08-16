//* middleware-функція (проміжне ПЗ) для валідації даних тіла зипиту на основі переданої схеми (schema) з з об'єкта Joi.

const { HttpError } = require("../helpers");

const validateBody = (schema, operation) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const fieldName = error.details[0].context.key;
      let errorMessage = "";

      // Перевіряємо, чи є помилка типу "required" в details
      const requiredError = error.details.find(
        (detail) => detail.type === "any.required"
      );

      // Якщо є помилка "required", виводимо кастомнє повідомлення
      if (operation === "add" && requiredError) {
        const errorMessage = `Missing required ${fieldName} field`;
        return res.status(400).json({ message: errorMessage });
      } else if (operation === "update") {
        if (!req.body || Object.keys(req.body).length === 0) {
          // Якщо тіло запиту відсутнє або воно пусте, виводимо кастомнє повідомлення
          const errorMessage = "Missing fields";
          return res.status(400).json({ message: errorMessage });
        } else if (!req.body[fieldName]) {
          // Якщо якесь поле запиту відсутнє, виводимо кастомнє повідомлення
          const errorMessage = `Missing required ${fieldName} field`;
          return res.status(400).json({ message: errorMessage });
        } else {
          // В інших випадках, використовуємо дефолтне повідомлення від Joi
          errorMessage = error.details[0].message;
        }

        next(HttpError(400, errorMessage));
      }
    }
    next();
  };
  return func;
};

module.exports = validateBody;
