const {Schema, model} = require("mongoose")
const Joi = require("joi")

const userSchema = Schema({
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  avatarURL: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, {versionKey: false, timestamps: true})

const register = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().default("starter"),
  token: Joi.string().default(null)
})

const login = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required()
})

const email = Joi.object({
  email: Joi.string().required()
})

const schemas = {
  register,
  login,
  email
}


const User = model("user", userSchema)

module.exports = {
    User,
    schemas
}