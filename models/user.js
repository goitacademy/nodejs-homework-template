const { Schema, model } = require('mongoose')
const Joi = require('joi ')
const bcrypt = require('bcryptjs')

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

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.srting().min(6).required()
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema
}
