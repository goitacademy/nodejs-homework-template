const { Schema, model } = require('mongoose')
const Joi = require('joi')

// const emailRegexp =

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    minlength: 6,
    unique: true,
  },
  // subscription: {
  //   type: String,
  //   enum: ["starter", "pro", "business"],
  //   default: "starter"
  // },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true })

const joiUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().min(6).required(),
  // subscription:
  token: Joi.string().default(null),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiUserSchema
}