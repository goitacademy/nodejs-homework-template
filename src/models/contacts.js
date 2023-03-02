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

  { versionKey: false, timeStamps: true }
);

const phonePattern = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

const joiSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z]+\s?[a-zA-Z]+$/)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().pattern(phonePattern).min(9).max(14).required(),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);
module.exports = { Contact, joiSchema, updateFavoriteSchema };
