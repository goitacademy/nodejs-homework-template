const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require("joi");

const schemaFullContact = Joi.object({
  phone: Joi.string()
    .pattern(/^[0-9()+-\s]+$/)
    .required(),
  name: Joi.string().min(3).max(25).required().pattern(/^[\s\S]*$/),
  email: Joi.string().required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua", "ca", "uk"] } })
    .required(),
    favorite: Joi.boolean()
});

const schemaFavoriteContact = Joi.object({
    favorite: Joi.boolean().required()
});


const contactSchema = new Schema(  {
  name: {
    type: String,
    required: [true, 'Set name for contact'],
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
  }, },
  {versionKey: false}
);

const Contact = mongoose.model('contact', contactSchema);
module.exports = {Contact, schemaFullContact, schemaFavoriteContact}