const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set mail for a contact'],
    },
    phone: {
      type: String,
      required: [true, 'Set contact number'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    image: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
)

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().min(14).max(14).required(),
  favorite: Joi.boolean(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema,
}
