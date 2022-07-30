const {Schema, model} = require('mongoose');
const Joi = require("joi");
const bcrypt = require('bcryptjs')

const userSchema = Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
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
    avatarUrl: {
      type: String,
      
    }
  }, {versionKey: false, timestamps: true})

  userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
  }

  const joiSignUpSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
    token: Joi.bool()
  })

const joiLoginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
})

const subscriptionJoiSchema = Joi.object({
  subscription:  Joi.string().required().valid("starter", "pro", "business")
})

const User = model("user", userSchema)

  module.exports = {User, joiSignUpSchema, joiLoginSchema, subscriptionJoiSchema}