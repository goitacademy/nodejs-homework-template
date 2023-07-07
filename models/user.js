const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseErr } = require('../helpers');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 4,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

const userAddSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().required(),
  token: Joi.string().required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': 'missing field {{#label}}',
  }),
});

const schemas = { addSchema, updateFavoriteSchema };

contactSchema.post('save', handleMongooseErr);

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };
