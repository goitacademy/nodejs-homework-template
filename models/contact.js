const { Schema, model } = require('mongoose')
const Joi = require('joi')

const emailRegexp =
  /^[a-zA-Z0-9][\w.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z.]*[a-zA-Z]$/
const phoneRegexp =
  /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      minlength: 5,
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      unique: true,
      match: emailRegexp,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      minlength: 10,
      unique: true,
      match: phoneRegexp,
    },
    favorite: {
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

const joiSchema = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().min(10).pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
})

const Contact = model('contact', contactSchema)

module.exports = { Contact, joiSchema }
