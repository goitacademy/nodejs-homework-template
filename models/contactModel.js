const { Schema, model } = require("mongoose");
const Joi = require('joi');

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
  },
  phone: {
    type: String,
    required: [true, 'Set phone for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contact", contactSchema);

const schemaCreate = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
    .required(),
  phone: Joi.string()
    .min(5)
    .max(15)
    .required(),
  favorite: Joi.bool(),
});

const schemaPatch = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = { Contact, schemaCreate, schemaPatch };

