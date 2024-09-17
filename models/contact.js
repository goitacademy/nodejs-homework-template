const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../middlewares');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, `Add contact's email`],
    },
    phone: {
      type: String,
      required: [true, `Add contact's phone`],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'missing field name',
  }),
  email: Joi.string().required().messages({
    'any.required': 'missing field email',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'missing field email',
  }),
  favorite: Joi.boolean(),
});

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': 'missing field favorite',
  }),
});

const schemas = { addSchema, updateStatusContactSchema };

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };