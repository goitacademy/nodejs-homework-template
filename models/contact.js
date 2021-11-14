const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      required: true,
      enum: [true, false],
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
)

const joiSchemaAdd = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().min(4).required().email(),
  phone: Joi.string()
    .min(9)
    .max(14)
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, 'numbers')
    .required(),
  favorite: Joi.boolean(),
})

const joiSchemaPut = Joi.object({
  name: Joi.string(),
  email: Joi.string().min(4).email(),
  phone: Joi.string()
    .min(9)
    .max(14)
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, 'numbers'),
  favorite: Joi.boolean(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchemaAdd,
  joiSchemaPut,
}
