const Joi = require('joi')

const { Schema, model } = require('mongoose')

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
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
  avatarURL: {
    type: String
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, { versionKey: false, timestamps: true })

const joiUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  avatarURL: Joi.string(),
})

const updateSubscriptionJoiSchema = Joi.object({
  subscription: Joi.string(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiUserSchema,
  updateSubscriptionJoiSchema
}
