const Mongoose = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const validateEmailReg = require('./options')

const userSchema = new Mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      match: validateEmailReg,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
)

userSchema.method({
  setPass: function (pass) {
    this.password = bcrypt.hashSync(pass, bcrypt.genSaltSync(10))
  },
  setToken: function (token) {
    this.token = token
  },
  isValid: function (pass) {
    return bcrypt.compareSync(pass, this.password)
  },
})

const UserModel = Mongoose.model('user', userSchema)

const JoiSchemaUser = Joi.object({
  email: Joi.string().pattern(validateEmailReg).required(),
  password: Joi.string().min(4).required(),
})

module.exports = { UserModel, JoiSchemaUser }
