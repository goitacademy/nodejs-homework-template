const Joi = require("joi");
const { Schema } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const addContactChema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(15)
    .required()
    .messages({ "any.required": `missing required "name" field` }), // 1-09 //
  email: Joi.string()
    .required()
    .messages({ "any.required": `missing required "email" field` }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": `missing required "phone" field` }),
  favorite: Joi.bool(),
});

const updateContactChema = Joi.object({
  name: Joi.string().min(3).max(15),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.bool(),
});
const updateFavoriteChema = Joi.object({
  favorite: Joi.bool(),
});

module.exports = {
  addContactChema,
  updateContactChema,
  updateFavoriteChema,
  contactSchema,
};
