const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { mongooseErrorHandler } = require("../helpers");

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
  { versionKey: false }
);

const Contact = model("contact", contactSchema);

contactSchema.post("save", mongooseErrorHandler);

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name" field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required "email" field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required "phone" field`,
  }),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

const contactsEditSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = {
  contactsAddSchema,
  contactsEditSchema,
  favoriteSchema,
  Contact,
};
