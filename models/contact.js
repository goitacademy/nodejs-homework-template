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
  { versionKey: false }
);

const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean().default(false),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

const ContactModel = model("contact", contactSchema);

module.exports = { ContactModel, joiSchema, favoriteSchema };
