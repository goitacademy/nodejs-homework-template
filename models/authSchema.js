const {Schema, model} = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const { subscriptionType } = require('./constants')

const userSchema = Schema({
  password: {
    type: String,
    min: [6, 'Password must has min 6 symbol'],
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscriptionType,
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true })

userSchema.methods.setPassword = function(password){
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

const User = model('user', userSchema)

const joiRegisterSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .min(6)
    .max(100)
    .required(),
})

const joiLoginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .min(6)
    .max(100)
    .required()
})

const updateContactStatusJoiSchema = Joi.object().keys({
  favorite: Joi.boolean().required()
})

const updateSubscriptionJoiSchema = Joi.object().keys({
  subscription: Joi.string().valid(...subscriptionType).required()
})

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  updateContactStatusJoiSchema,
  updateSubscriptionJoiSchema
}
