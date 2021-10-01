const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const codeRegexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: [codeRegexMail, 'Please fill a valid email address'],
      required: [true, 'Email is required'],
      unique: true,
    },
    // subscription: {
    //   type: String,
    //   enum: ['starter', 'pro', 'business'],
    //   default: 'starter',
    // },
    // token: {
    //   type: String,
    //   default: null,
    // },
  },
  { versionKey: false, timestamps: true },
)

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const joiSchema = Joi.object({
  email: Joi.string().pattern(codeRegexMail).required(),
  password: Joi.string().min(4).required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema,
}
