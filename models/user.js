const { Schema, model } = require('mongoose');

const Joi = require('joi');

const sub = ["starter", "pro", "business"];
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const userSchema = Schema({
   email:  {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
   },
   password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
   },
   subscription: {
      type: String,
      enum: sub,
      default: "starter"
   },
   token: {
      type: String,
      default: '',
   },
   avatarURL: {
      type: String,
      required:true
   }
}, { versionKey: false, timestamps: true });

const registerUser = Joi.object({
   email: Joi.string().pattern(emailRegexp).required(),
   password: Joi.string().min(6).required(),
   subscription: Joi.string().default('starter').valid(...sub)
})
const loginUser = Joi.object({
   email: Joi.string().pattern(emailRegexp).required(),
   password: Joi.string().min(6).required(),
})
const schemas = {
   registerUser,
   loginUser
}
const User = model('user', userSchema);

module.exports = {
   User,
   schemas
}