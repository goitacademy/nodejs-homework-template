const Joi = require("joi"); // Підключення модуля для валідації даних

const schema = Joi.object({
  // Визначення схеми валідації для додавання контакту
  name: Joi.string().required(), // Вимагається рядок з ім'ям
  email: Joi.string().required(), // Вимагається рядок з електронною поштою
  phone: Joi.string().required(), // Вимагається рядок з номером телефону
});

module.exports = {
  schema,
};
