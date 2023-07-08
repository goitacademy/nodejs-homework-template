const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseErr } = require('../helpers');

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, 'Set name for contact'] },
    email: String,
    phone: String,
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
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
