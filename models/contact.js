const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const emailRegExp = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
const phoneRegExp = /^380d{9}$/;

const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegExp).required(),
  favorite: Joi.boolean().default(false).required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().default(false).required(),
});

const schemas = { addSchema, updateFavoriteSchema };

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegExp,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: phoneRegExp,
    },
    favorite: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const Contact = model('Contact', contactSchema);

module.exports = { Contact, schemas };
