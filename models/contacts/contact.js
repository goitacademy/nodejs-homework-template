
const mongoose = require('mongoose');
const Joi = require('joi');

const codeRegexp = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/;

const { Schema, model } = mongoose;

const contactSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    match: codeRegexp,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true },
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().pattern(codeRegexp).required(),
  favorite: Joi.boolean(),
});

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  joiSchema,
};
