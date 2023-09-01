const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils');
const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

const schemas = { addSchema, updateFavoriteSchema };

const options = { versionKey: false, timestamps: true };

const mongooseSchema = {
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: String,
  phone: String,
  favorite: { type: Boolean, default: false },
};

const contactSchema = new Schema(mongooseSchema, options);

contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };
