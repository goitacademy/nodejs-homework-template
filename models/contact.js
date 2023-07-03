const Joi = require("joi");
const { Schema, model } = require("mongoose");

const contactsSchema = new Schema(
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

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateFaforiteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemasJoi = { addSchema, updateFaforiteSchema };

const Contact = model("contact", contactsSchema);

module.exports = { Contact, schemasJoi };
