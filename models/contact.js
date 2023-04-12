const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const nameRegExp = /^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)?$/;
const phoneRegExp = /^(\(\d{3}\)\s*\d{3}-\d{4}|\d{5,15})$/;
const favoriteOptions = [true, false];

const addSchema = Joi.object({
  name: Joi.string().pattern(nameRegExp).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegExp).required(),
  favorite: Joi.boolean()
    .valid(...favoriteOptions)
    .required(),
});

const updSchema = Joi.object({
  name: Joi.string().pattern(nameRegExp),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phoneRegExp),
}).or("name", "email", "phone");

const updStatusSchema = Joi.object({
  favorite: Joi.boolean()
    .valid(...favoriteOptions)
    .required(),
});

const contactSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegExp,
      required: [true, "Set <name> for contact"],
    },
    email: {
      type: String,
      required: [true, "Set <email> for contact"],
    },
    phone: {
      type: String,
      match: phoneRegExp,
      required: [true, "Set <phone> for contact"],
    },
    favorite: {
      type: Boolean,
      enum: favoriteOptions,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { addSchema, updSchema, updStatusSchema, Contact };
