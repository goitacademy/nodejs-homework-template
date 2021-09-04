const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'name is required field'],
  },
  email: {
    type: String,
    required: [true, 'email is required field'],
  },
  phone: {
    type: String,
    required: [true, 'phone is required field'],
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

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(new RegExp('^[\\d() +-]+$')).required(),
  favorite: Joi.boolean().default(false),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiContactSchema
}
