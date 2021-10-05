const { Schema, model } = require('mongoose')
const Joi = require('joi')

const codeRegexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const codeRegexPhone = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      minlength: 1,
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      match: [codeRegexMail, 'Please fill a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      match: codeRegexPhone,
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

const joiSchema = Joi.object({
  name: Joi.string().min(1).required(),
  phone: Joi.string().pattern(codeRegexPhone).required(),
  email: Joi.string().pattern(codeRegexMail).required(),
  favorite: Joi.boolean(),
})

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const Contact = model('contact', contactSchema)

module.exports = { joiSchema, updateFavoriteJoiSchema, Contact }
