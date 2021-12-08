const { Schema, model } = require('mongoose')
const Joi = require('joi')

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    required: true,
    unique: true,
    minlength: 6
  }
}, { versionKey: false, timestamps: true })

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required()
})

const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required()
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema
}
