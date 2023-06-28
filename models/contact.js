const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

/* Example array of available values and phone validation */
// const names = ['Alex', 'Jon', 'Michael'];
const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      // Array of available values:
      // enum: names,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

// name: Joi.string().valid(...names).required() if validation in addSchema needed
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});

const Contact = model('contact', contactSchema);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = { Contact, schemas };
