const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = new Schema(
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
      ref: 'user',
    }
  },
  { versionKey: false, timestamps: true },
)

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': `Should be a type of 'text'`,
    'any.required': `Missing required name field`,
    'string.min': `Should have a minimum length of {#limit}`,
  }),
  email: Joi.string().required().messages({
    'string.base': `Should be a type of 'text'`,
    'any.required': `Missing required name field`,
    'string.min': `Should have a minimum length of {#limit}`,
  }),
  phone: Joi.string().min(9).max(15).required().messages({
    'string.base': `Should be a type of 'text'`,
    'any.required': `Missing fields`,
    'string.min': `Should have a minimum length of {#limit}`,
  }),
  favorite: Joi.bool,
})

const contactUpdSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': `Should be a type of 'text'`,
    'any.required': `Missing fields`,
    'string.min': `Should have a minimum length of {#limit}`,
  }),
  email: Joi.string().required().messages({
    'string.base': `Should be a type of 'text'`,
    'any.required': `Missing fields`,
    'string.min': `Should have a minimum length of {#limit}`,
  }),
  phone: Joi.string().min(9).max(15).required().messages({
    'string.base': `Should be a type of 'text'`,
    'any.required': `Missing fields`,
    'string.min': `Should have a minimum length of {#limit}`,
  }),
  favorite: Joi.bool,
})

const updateStatusContact = Joi.object({
  favorite: Joi.bool().required().messages({
    'any.required': `Missing field favorite`,
  }),
})

const schemas = {
  contactAddSchema,
  contactUpdSchema,
  updateStatusContact,
}

const Contact = model('contacts', contactSchema)

module.exports = { Contact, schemas }
