const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const errorMessages = {
  'any.required': `{#key} is a required field`,
  'string.email': 'email field must be a valid email',
  'string.base': `{#key} field must be a string`,
  'boolean.base': `{#key} field must be a boolean`,
  'object.unknown': `{#key} field is not allowed`,
  'object.min': 'missing fields',
};

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
  },
  { versionKey: false }
);

contactSchema.post('save', handleMongooseError);

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().default(false),
}).messages(errorMessages);

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
})
  .min(1)
  .messages(errorMessages);

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({
  ...errorMessages,
  'any.required': 'missing field favorite',
});

const schemas = {
  addContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
};

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
