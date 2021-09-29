const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      minlength: 3,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      minlength: 6,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true, retainKeyOrder: true },
)

const JoicontactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(3).required(),
  phone: Joi.string().min(6).required(),
  favorite: Joi.boolean(),
})

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  JoicontactSchema,
  updateFavoriteJoiSchema,
}
