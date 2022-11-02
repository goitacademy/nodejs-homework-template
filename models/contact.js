const { Schema, model } = require('mongoose');

const Joi = require('joi')

const {handleSaveErrors} = require('../helpers/Errors');

const contactSchema = new Schema(  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      unique: true,
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
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

contactSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email should be valid',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  phone: Joi.string().min(10).max(15).required(),
  favorite: Joi.boolean().optional(),
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})


const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
}
