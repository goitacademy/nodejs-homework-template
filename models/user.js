/* eslint-disable no-useless-escape */
/* eslint-disable no-tabs */
const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
	avatarURL: {
		type: String,
		required: true,
	},
}, { versionKey: false, timestamps: true })

userSchema.methods.setPassword = function(password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
		console.log(this.password)
}

userSchema.methods.comparePassword = function(password) {
 return bcrypt.compareSync(password, this.password)
}

const joiSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp),
    password: Joi.string().min(6).required(),
		subscription: Joi.string().valid('starter', 'pro', 'business'),
})

const User = model('user', userSchema)

module.exports = {
    User,
    joiSchema
}
