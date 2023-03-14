const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contacts"],
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
  { versionKey: false, timestamp: true }
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string.required(),
  favorite: Joi.bool(),
});

const favotiteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactsSchema);

module.exports = {
  contactsSchema,
  joiSchema,
  favotiteJoiSchema,
  Contact,
};
