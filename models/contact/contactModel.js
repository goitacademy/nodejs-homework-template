const mongoose = require('mongoose');
const Joi = require("joi");

const { PHONE_REGEX } = require('../../utils/patterns');
const { handleMongooseError } = require('../../helpers/index')

const contactSchemaJoi = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .pattern(PHONE_REGEX)
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const contactSchema = mongoose.Schema({
     name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      default: 'Hasn`t email yet'
    },
    phone: {
      type: String,
      match: PHONE_REGEX,
      required: [true, 'Oh no, contact can`t be without phone'],
    },
    favorite: {
      type: Boolean,
      default: false,
  },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
}, {versionKey: false, timestamps: true})

contactSchema.post('save', handleMongooseError)

const Contact = mongoose.model('contact', contactSchema)

module.exports = { Contact, contactSchemaJoi, updateFavoriteSchema };