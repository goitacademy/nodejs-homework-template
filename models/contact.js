const { Schema, model } = require('mongoose');
const Joi = require('joi');

const phonePattern = /^(\([0-9]{3}\)) [0-9]{3}-[0-9]{4}$/;

const contactsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: phonePattern,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'ua', 'net'] } })
    .required(),
  phone: Joi.string().length(14).pattern(phonePattern).required(),
  favorite: Joi.boolean().default(false),
});

const updateContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  add: addContactSchema,
  update: updateContactSchema,
};

const Contact = model('contact', contactsSchema);

module.exports = { Contact, schemas };
