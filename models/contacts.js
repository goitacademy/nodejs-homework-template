const { Schema, model } = require('mongoose')
const Joi = require('joi')

const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
const nameRegExp = /^[A-z][A-z0-9-_-\s?]{3,23}$/

const contactSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegExp,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: emailRegExp,
      required: [true, 'Set email for contact'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Enter phone number'],
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
)

const Contact = model('contact', contactSchema)

const contactAddSchema = Joi.object({
  name: Joi.string().pattern(nameRegExp).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  phone: Joi.string().required(),
  favourite: Joi.boolean(),
})

const updateFavouriteSchema = Joi.object({
  favourite: Joi.boolean().required(),
})

const schemas = {
  contactAdd: contactAddSchema,
  updateFavourite: updateFavouriteSchema,
}

module.exports = {
  Contact,
  schemas,
}