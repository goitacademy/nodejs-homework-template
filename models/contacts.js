const { Schema, model } = require('mongoose')
const Joi = require('joi')
const validator = require('mongoose-validator')

const phoneRegexp = /^[0-9]+$/
const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      default: 'NoName',
      require: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      trim: true,
      require: [true, 'Set email for contact'],
      validate: [
        validator({
          validator: 'isEmail',
          message: 'Oops..please enter valid email',
        }),
      ],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      unique: true,
      default: false,
      require: [true, 'Set phone for contact'],
    },
    favorite: { type: Boolean, trim: true },
  },
  { versionKey: false, timestamps: true },
)

const joiSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(10).pattern(phoneRegexp).required(),
  favorite: Joi.boolean().default(false),
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})
const Contact = model('contact', contactSchema)

module.exports = {
  joiSchema,
  updateFavoriteSchema,
  Contact,
}
