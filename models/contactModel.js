const { Schema, model } = require("mongoose");
const Joi = require("joi");

// Валідатор даних на сервері
const schemaDBContactValidator = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

// Middleware обробки помилки валідації на сервері. Додаємо статус помилки, оскільки MongoDB повертає помилку без статусу
schemaDBContactValidator.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const Contact = model("contact", schemaDBContactValidator);

// Валідатори отриманих з клієнта даних
const contactValidator = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const schemas = { contactValidator };

module.exports = { schemas, Contact };
