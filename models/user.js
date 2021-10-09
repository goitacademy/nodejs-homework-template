const Joi = require('joi')
// const bcrypt = require('bcryptjs')

const { Schema, model, SchemaTypes } = require('mongoose')

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
  token: {
    type: String,
    default: null,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true })

// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compareSync(password, this.password)
// }

const joiUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
  owner: Joi.types()
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiUserSchema
}
