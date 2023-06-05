const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

const addContactsSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().min(4).max(100).required().email(),
  phone: Joi.string()
    .min(4)
    .max(20)
    .required()
    .pattern(/^(\+3|)[0-9]{10,11}$/),
  favorite: Joi.boolean().optional(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({
  "any.required": "missing field favorite",
});

const schemas = { addContactsSchema, updateFavoriteSchema };
const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };