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
  token: {
    type: String,
    default: null,
  },
}, {versionKey: false, timestamps: true})

const register = Joi.object({
  password: Joi.string().required(),

  email: Joi.string().required()
})

const userJoiSchema = {
  register
}


const User = model("user", userSchema)

module.exports = {
    User,
    userJoiSchema
}