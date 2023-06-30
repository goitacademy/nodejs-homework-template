const { Schema, model } = require('mongoose');
const { handleErrors } = require('../middlewares');
const Joi = require('joi');

const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-z]+)$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
      mattch: emailRegex,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      mattch: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleErrors);

const joiSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().pattern(emailRegex).required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model('contact', contactSchema);

module.exports = { Contact, joiSchema, favoriteJoiSchema };
