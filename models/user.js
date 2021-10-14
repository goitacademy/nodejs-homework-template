const { Schema, model } = require('mongoose')
const Joi = require('joi ')

const userSchema = Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.srting().min(6).required()
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema
}
