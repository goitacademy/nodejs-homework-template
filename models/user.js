const { Schema, model } = require("mongoose")
const Joi = require("joi");
const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const userSchema = Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  // subscription: {
  //   type: String,
  //   enum: ["starter", "pro", "business"],
  //   default: "starter"
  // },
  // token: {
  //   type: String,
  //   default: null,
  //   }
}, { versionKey: false })
const registerSchema = Joi.object({

    name: Joi.string().required(),

    email: Joi.string().pattern(emailRegexp).required(),

    password: Joi.string().min(6).required(),

});

const User = model('user', userSchema)
module.export = {
    User, registerSchema
}