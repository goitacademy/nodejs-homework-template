const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleSchemaValidationErrors = require("../helpers/handleSchemaValidationError");
const selectedList = ["Job, Family, Friends"];

// * Для TypeScript использовать new Schema
const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: String,
    enum: selectedList,
    // default: "All",
    // ? По дефолту можеть быть только Boolean?
  },
});

const addContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+?[\d\s()-]+$/)
    .required(),
  favorite: Joi.bool(),
  selected: Joi.string().valueOf(...selectedList),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});
contactSchema.post("save", handleSchemaValidationErrors);
// * Если произойдет ошибка при сохранении - "save" , то произойдет вызов функции handleErrors

const schemas = {
  addContactSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);
// * Имя коллекции в единственном числе, mongoose сам преобразует в множественное:
// * contact => contacts
module.exports = { Contact, schemas };
