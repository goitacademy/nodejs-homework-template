const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .min(7)
    .required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .min(7),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactsDb = new Schema(
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

const Contacts = mongoose.model("contacts", contactsDb);

module.exports = { Contacts, addSchema, updateSchema, favoriteSchema };
