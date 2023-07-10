const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

// Схема валідації Joi (даних, що прийшли)
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema
}

// Схема валідації mongoose (даних, які хочемо зберегти)
const contactSchema = new Schema( {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
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

// Ця функція спрацює тільки, якщо помилка станеться під час валідації
contactSchema.post("save", handleMongooseError);
  
// Створюємо модель
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
}