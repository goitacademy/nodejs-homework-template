const { Schema, model } = require('mongoose');
const Joi = require('joi');

const usersSchema = Schema({

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
    required: [true, 'Avatar is required'],
  }
}, { versionKey: false, timestamps: true })

const User = model("user", usersSchema)

const joiUserSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
    avatarURL:Joi.string()
}) 


module.exports = {
    User,
  joiUserSchema

}