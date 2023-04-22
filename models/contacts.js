const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegexp = /^[\(]\d{3}[\)]\s\d{3}[\-]\d{4}$/;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: [true, "Set email for contact"],
  },
  phone: {
    type: String,
    match: phoneRegexp,
    required: [true, "Set phone for contact"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const addSchema = Joi.object({
  name: Joi.string()
    .messages({
      "any.required": "missing required name field",
    })
    .required(),
  email: Joi.string()
    .messages({
      "any.required": "missing required email field",
    })
    .required(),
  phone: Joi.string()
    .pattern(phoneRegexp)
    .messages({
      "any.required": "missing required phone field",
    })
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .messages({
      "any.required": "missing field favorite",
    })
    .required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };