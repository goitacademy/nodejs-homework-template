const {Schema, model} = require('mongoose')
const Joi = require('joi')
const {codeRegexp} = require('./constants')

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    match: codeRegexp,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true })

const Contact = model('contact', contactSchema)

const addContactJoiSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(codeRegexp, 'phone number not valid')
    .required(),
  favorite: Joi.boolean()
})

const updateContactJoiSchema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(100)
    .optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),
  phone: Joi.string()
    .length(10)
    .pattern(codeRegexp)
    .optional(),
  favorite: Joi.boolean()
    .optional()
})

const updateContactStatusJoiSchema = Joi.object().keys({
  favorite: Joi.boolean().required()
})

module.exports = { Contact, addContactJoiSchema, updateContactJoiSchema, updateContactStatusJoiSchema }
