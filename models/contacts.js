const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const Joi = require("joi");

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const phoneRegexp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
    },
    phone: {
      type: String,
      match: phoneRegexp,
      unique: true,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

contactSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `"name" should be a type of 'string'`,
    "any.required": `"name" is a required field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": `"email" should be a type of 'string'`,
    "any.required": `"email" is a required field`,
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "string.base": `"phone" should be a type of 'string'`,
    "any.required": `"phone" is a required field`,
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
