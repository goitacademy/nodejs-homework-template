const joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema({
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

contactSchema.post("save", handleMongooseError);

const joiSchema = joi.object({
  name: joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  phone: joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: joi.boolean,
});

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean().required().messages({
    "any.required": "missing required favorite field",
  }),
});

const schemas = {
  joiSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
