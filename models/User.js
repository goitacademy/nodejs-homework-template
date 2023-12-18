const { Schema, model } = require("mongoose")
const { handleSaveError, runValidatorsAtApdate } = require("../models/hooks")
const Joi = require('joi');

const emailRagexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
    minlength:6,
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
  token: String
}, 
  {versionKey: false}
)


userSchema.post("save", handleSaveError)
userSchema.pre("findOneAndUpdate", runValidatorsAtApdate);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema)



const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRagexp).required()
      .messages({
        "any.required": "Missing required email field.",
        "string.email": "Invalid email format. Please enter a valid email",
        "string.pattern.base": "Invalid email format. Please enter a valid email"
    }),
    password: Joi.string().min(6).required()
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRagexp).required()
      .messages({
        "any.required": "Missing required email field.",
          "string.email": "Invalid email format. Please enter a valid phone number"
    }),
    password: Joi.string().min(6).required()
})


module.exports = { User, registerSchema, loginSchema }