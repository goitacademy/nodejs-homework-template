const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validSubscriptions = ["starter", "pro", "business"];

const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: validSubscriptions,
      default: "starter"
    },
    token: String
  },{
  versionKey: false
});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    subscription: Joi.string().valid(...validSubscriptions),
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegex).required(),
})

const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().min(6).required(),
})

const schemas = {
    registerSchema,
    loginSchema,
}

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
}