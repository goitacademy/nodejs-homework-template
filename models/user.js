const { Schema, model } = require('mongoose')
const Joi = require('joi')

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

const joiSchema = Joi.object({
  email: Joi.string().pattern(codeRegexMail).required(),
  password: Joi.string().min(4).required,
})

module.exports = {
  userSchema,
  joiSchema,
}
