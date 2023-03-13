const { Schema, model } = require("mongoose")
const Joi = require('joi')

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
    }, { versionKey: false, timestamps: true })

const Contact = model('contact', contactSchema)

const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
})

const favoriteJoiSchema = Joi.object({
    favorite: Joi.boolean().required()
})

module.exports = {
    Contact,
    joiSchema, 
    favoriteJoiSchema
}
