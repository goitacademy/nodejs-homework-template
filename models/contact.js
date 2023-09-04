const Joi = require("joi");
const mongoose = require("mongoose");

const {handleMongooseError} = require("../helpers");

const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
const nameRegex = /^[A-Za-z]+$/;
const contactSchemaJoi = Joi.object({
  name: Joi.string().regex(nameRegex).min(3).max(20).required().messages({
    "any.required": "missing required name field",
    "string.min": "name should be at least {#limit} characters",
    "string.max": "name should be at most {#limit} characters",
    "string.pattern.base": "name should contain only letters",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk"] } })
    .required()
    .messages({
      "any.required": "missing required email field",
      "string.email": "invalid email format",
    }),
  phone: Joi.string().pattern(phoneRegex).required().messages({
    "any.required": "missing required phone field",
    "string.pattern.base": "invalid phone number format",
  }),
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchemaMongoose = new mongoose.Schema(
  {
    name: {
      type: String,
      match: nameRegex,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchemaMongoose.post("save", handleMongooseError);

const Contact = mongoose.model("Contact", contactSchemaMongoose);

const schemas = {
  contactSchemaJoi,
  updateFavoriteSchema,
};

module.exports = { Contact, schemas };
