const { Schema, model } = require("mongoose");

const Joi = require("joi");

const contactSchema = new Schema(
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

const addContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
    "string.empty": `name cannot be an empty field`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `missing required email field`,
    "string.email": `email must be a valid email address`,
    "string.empty": `email cannot be an empty field`,
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      "any.required": `missing required phone field`,
      "string.pattern.base": `phone must be in the format (xxx) xxx-xxxx`,
      "string.empty": `phone cannot be an empty field`,
    }),
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
    "boolean.base": `favorite must be a boolean value`,
  }),
});

const updateContactSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": `name cannot be an empty field`,
  }),
  email: Joi.string().email().messages({
    "string.email": `email must be a valid email address`,
    "string.empty": `email cannot be an empty field`,
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "string.pattern.base": `phone must be in the format (xxx) xxx-xxxx`,
      "string.empty": `phone cannot be an empty field`,
    }),
    favorite: Joi.boolean().messages({
      "boolean.base": `favorite must be a boolean value`,
    }),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
    "boolean.base": `favorite must be a boolean value`,
  }),
});

const Contact = model("contacts", contactSchema);

module.exports = {
  Contact,
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
};
