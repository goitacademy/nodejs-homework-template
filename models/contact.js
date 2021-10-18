const Mongoose = require('mongoose')
const Joi = require('joi')
const validateEmailReg = require('./options')

const contactSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      match: validateEmailReg,
    },
    phone: {
      type: String,
      minlength: 5,
    },
    owner: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { versionKey: false, timestamps: true }
)

const ContactModel = Mongoose.model('contact', contactSchema)

const JoiSchemaContact = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().required().pattern(validateEmailReg),
  phone: Joi.string().required().min(5),
})

module.exports = { JoiSchemaContact, ContactModel }
