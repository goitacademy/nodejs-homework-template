const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is a required field`,
    "string.base": `"name" should be a type of string`,
    "string.empty": `"name" cannot be an empty field`,
    "string.min": `"name" should have a minimum length of 2`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is a required field`,
    "string.base": `"email" should be a type of string`,
    "string.empty": `"email" cannot be an empty field`,
    "string.min": `"email" should have a minimum length of 6`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is a required field`,
    "string.base": `"phone" should be a type of string`,
    "string.empty": `"phone" cannot be an empty field`,
    "string.min": `"phone" should have a minimum length of 10`,
  }),
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchema = new Schema(
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
contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const schemas = { addSchema, updateFavoriteSchema };
module.exports = { Contact, schemas };
