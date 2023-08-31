const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
)

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({ "any.required": "missing required email field" }),
  password: Joi.string().required().messages({ "any.required": "missing required password field" }),
})

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({ "any.required": "missing required email field" }),
  password: Joi.string().required().messages({ "any.required": "missing required password field" }),
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