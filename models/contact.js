const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = new Schema(
  {
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
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false },
);

const Contact = model('contact', contactSchema);

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const addContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required().messages({
    'string.email': '{#key} is not valid',
  }),
  phone: Joi.string().pattern(phoneRegExp).required().messages({
    'string.pattern.base': '{#key} is not valid',
  }),
  favorite: Joi.boolean(),
}).messages({
  'any.required': 'missing required {#key}',
});

const updateContact = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().message('{#key} is not valid'),
  phone: Joi.string().pattern(phoneRegExp).message('{#key} is not valid'),
})
  .or('name', 'email', 'phone')
  .messages({
    'object.missing': 'missing fields',
  });

const updateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({
  'any.required': 'missing required {#key}',
});

const schema = {
  addContact,
  updateContact,
  updateStatusContact,
};

module.exports = { Contact, schema };
