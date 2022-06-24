const { Schema, model } = require("mongoose");
const Joi = require("joi");

const addContactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", addContactSchema);

const addContact = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string(),
  email: Joi.string(),
  favorite: Joi.boolean(),
});

const updateContact = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).or("name", "email", "phone");

const updateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addContact,
  updateContact,
  updateStatusContact,
};

module.exports = { Contact, schemas };
