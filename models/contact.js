const { Schema, model } = require("mongoose");
const Joi = require("joi");

const addSchema = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const addStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

// create schema
const contactSchema = new Schema({
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

// create model
const Contact = model("contact", contactSchema);

module.exports = { Contact, addSchema, addStatusSchema };
