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

// name: Joi.string().valid(...names).required() if validation in addSchema needed
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});

contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

const schemas = {
  addSchema,
};

module.exports = { Contact, schemas };
