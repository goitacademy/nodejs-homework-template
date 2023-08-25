const mongoose = require("mongoose");
const Joi = require("joi");

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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { versionKey: false }
);

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),

  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "missing required phone field" }),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

const schemas = { addSchema, updateFavoriteSchema };
const Contact = mongoose.model("Contacts", contactSchema);

module.exports = { Contact, schemas };
