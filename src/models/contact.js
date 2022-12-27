const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleSchemaValidationErrors = require("../helpers/handlerSchemaValidation");

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSchemaValidationErrors);
const Contact = model("contact", contactSchema);

const contact = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
};

const createContactSchema = Joi.object({
  name: contact.name,
  email: contact.email,
  phone: contact.phone,
  favorite: contact.favorite,
});

const updateContactFavoriteSchema = Joi.object({
  favorite: contact.favorite,
});

module.exports = { Contact, createContactSchema, updateContactFavoriteSchema };
