const joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { mongooseErrorHandler } = require('../helpers');

const contactScheme = new Schema(
  {
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
      ref: 'users',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
contactScheme.post('save', mongooseErrorHandler);
const ContactModel = mongoose.model('contacts', contactScheme);

const contactJoiSchemas = {
  addSchema: joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
    favorite: joi.boolean(),
  }),

  updateSchema: joi
    .object({
      name: joi.string().optional(),
      email: joi.string().optional(),
      phone: joi.string().optional(),
    })
    .or('name', 'email', 'phone'),

  updateFavoriteField: joi.object({
    favorite: joi.boolean().required(),
  }),

  getContactsQueryParam: joi.object({
    favorite: joi.boolean().optional(),
    limit: joi.number().optional(),
    page: joi.number().optional(),
  }),
};

module.exports = {
  ContactModel,
  contactJoiSchemas,
};
