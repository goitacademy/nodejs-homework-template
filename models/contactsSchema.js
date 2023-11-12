const Joi = require("joi");
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
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
  favorite: Joi.boolean(),
});

const changeFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = mongoose.model("contact", contactSchema);
const schemas = { addSchema, changeFavoriteSchema };

module.exports = { Contact, schemas };