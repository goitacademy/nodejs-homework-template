const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const contactSchema = new Schema({
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
    required: true,
  },
});

contactSchema.post('save', handleMongooseError);

function checkPhone(value) {
  return /^(\(\d{3}\)\s\d{3}-\d{4})$/.test(value);
}

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  // phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
  phone: Joi.string().custom((value, helpers) => {
    if (!checkPhone(value)) {
      return helpers.message('Please enter a phone number in the format (XXX) XXX-XXXX');
    }
    return value;
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
