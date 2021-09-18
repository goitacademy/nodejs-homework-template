const bcrypt = require('bcryptjs')
const { Schema, model } = require('mongoose')
const Joi = require('joi')

const emailRegExp =
  /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/

const JoiUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
  token: Joi.string(),
})

const userSchema = Schema({

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: emailRegExp,

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },

    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },

    token: {
      type: String,
      default: null,
    },
  }

},

{ versionKey: false, timestamps: true }

)

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = model('user', userSchema)

module.exports = { User, JoiUserSchema }
