const { Schema, model } = require("mongoose");

const { handleMongoseError } = require("../helpers");

const Joi = require("joi");

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
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

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field",
  }),
  email: Joi.string().messages({
    "any.required": "Missing required email field",
  }),
  phone: Joi.string().messages({
    "any.required": "Missing required phone field",
  }),
  favorite: Joi.boolean().messages({
    "any.required": "Missing required favorite field",
  }),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Missing required favorite field",
  }),
})

contactSchema.post("save", handleMongoseError);

const Contact = model("contact", contactSchema);

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = { Contact, schemas };
