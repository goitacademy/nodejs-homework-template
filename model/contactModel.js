const { Schema, model, SchemaTypes } = require('mongoose')
const Joi = require('joi')

const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const phoneCheck = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/

const JoiContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(emailCheck).required(),
  phone: Joi.string().pattern(phoneCheck).required(),
  favorite: Joi.boolean(),
})

const contactSchema = Schema(
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
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
)

const Contact = model('contact', contactSchema)

module.exports = {
  JoiContactSchema,
  Contact
}
