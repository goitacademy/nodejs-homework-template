const {Schema, model} = require('mongoose');
const Joi = require('joi');
const {handleSaveErrors} = require('../helpers');

const contactSchema = new Schema (  {
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
  }, {versionKey: false, timestamps: true});

  contactSchema.post("save", handleSaveErrors);

  const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });

  const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
      'any.required': `missing field favorite`
    })
  });

  const schemas = {
    addContactSchema,
    updateFavoriteSchema,
  }

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};