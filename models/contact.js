const {Schema, model} = require("mongoose")
const Joi = require("joi")

const contactSchema = Schema ({
    name: {
      type:String,
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
      enum: [true, false],
      default: false,
    },
}, { versionKey: false, timestamps: true })


const contactJoiSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": 'missing required name field',
  }),
  email: Joi.string().required().messages({
    "any.required": 'missing required email field',
  }),
  phone: Joi.number().required().messages({
    "any.required": 'missing required phone field',
  }),
})

const statusJoiSchema = Joi.object({
    favorite: Joi.boolean().required(),
  })


const Contact = model('contact', contactSchema)

module.exports = {
    Contact,
    contactJoiSchema,
    statusJoiSchema,
}



