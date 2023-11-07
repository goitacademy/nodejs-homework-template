const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { HttpError } = require('../utils');

const options = { versionKey: false, timestamps: true };

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: String,
    phone: String,
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  options
);

contactSchema.post('save', (error, data, next) => {
  const errorMessage = error.errors.name.properties.message;
  next(HttpError({ status: 400, message: errorMessage }));
});

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const updateSchema = Joi.object().length(1);

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  addSchema,
  updateSchema,
  updateStatusContactSchema,
};
