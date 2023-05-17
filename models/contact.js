const { Schema, model } = require('mongoose');
const { HandleMongooseError } = require('../helpers');

const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'missing required name field',
  }),
  email: Joi.string().required().messages({
    'any.required': 'missing required email field',
    'string.email': 'invalid email format',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'missing required phone field',
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

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
  { versionKey: false, timestamps: true }
);

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

contactSchema.post('save', HandleMongooseError);

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };
