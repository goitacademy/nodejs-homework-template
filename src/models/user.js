const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength:8,
    },
    email: {
      type: String,
      unique:true,
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
  }, { versionKey: false, timestamps: true });
  
  
  const joiUserSchema = Joi.object({
    password: Joi.string().min(8).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    subscription: Joi.string(),
    token: Joi.string(),
})

const User = model("user", userSchema );

module.exports = {
    User,
    joiUserSchema
};