const Joi = require("joi")
const { Schema, model } = require("mongoose")
const handleMongooseError = require("../helpers/handleMongooseError")

const emailRegaxp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema({
    password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    match: emailRegaxp,
    required: [true, 'Email is required'],
    unique: true,
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
  avatarURL: {
    type: String,
    required: [true, 'Avatar is required'],
  }
},{verionKey:false, timestamps:true})

userSchema.post("save", handleMongooseError)

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(6).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6).required()
})

const logoutSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6).required()
})

const currentUserSchema = Joi.object({
  token: Joi.string().required(),
  // email: Joi.string().email(),
  // password: Joi.string().min(6).required()
})

const schemas = {
  registerSchema,
  loginSchema,
  logoutSchema,
  currentUserSchema,
}

const User = model("user", userSchema)

module.exports = {
    User,
    schemas
}