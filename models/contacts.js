const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegex = /^\(([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const contactsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .regex(phoneRegex)
    .message("Phone format (xxx) xxx-xxxx")
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  }),
});

const schemas = { contactsSchema, updateFavoriteSchema };

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
