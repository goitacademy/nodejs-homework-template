const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSaveErrors } = require('../helpers');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().trim().required(),
  favorite: Joi.bool(),
})
  .min(1)
  .required();

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const joiContactSchema = { addSchema, updateFavoriteSchema };

const Contact = model('contact', contactSchema);

module.exports = { Contact, joiContactSchema };
