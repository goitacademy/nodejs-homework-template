const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
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
});

contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const postCheckingSchema = Joi.object({
  name: Joi.string()
    .min(3)
    // .alphanum()
    .required()
    .error(new Error("missing required name field")),
  email: Joi.string()
    .email()
    .required()
    .error(new Error("missing required email field")),
  phone: Joi.string()
    .required()
    .error(new Error("missing required phone field")),
  favorite: Joi.boolean()
    .required()
    .error(new Error("missing required favorite field")),
});

const putCheckingSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
}).min(1);

const patchCheckingSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);
const schemas = { postCheckingSchema, putCheckingSchema, patchCheckingSchema };

module.exports = { Contact, schemas };