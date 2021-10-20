const { Schema, model } = require('mongoose')
const Joi = require('joi')

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Еnter a name'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Еnter an email'],
    },
    phone: {
      type: String,
      minlength: 1,
      maxlength: 20,
      required: [true, 'Еnter a phone'],
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
  { versionKey: false, timestamps: true },
)

const Contact = model('contact', contactSchema)

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})

module.exports = {
  joiContactSchema,
  Contact,
}
