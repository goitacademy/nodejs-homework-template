const Joi = require("joi");
const {Schema, model} = require("mongoose");

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
      avatarURL: {
        type: String,
        required: true
      }
}, {versionKey: false, timestamps: true});

const userJoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
  })
    
  const User = model("user", userSchema); 

  module.exports = {
    User,
    userJoiSchema
  }