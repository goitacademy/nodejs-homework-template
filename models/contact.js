const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError/handleMongooseError');

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegExp = /^380\d{9}$/;

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },

  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const Contact = model('Contact', contactSchema);

module.exports = { Contact, schemas };
