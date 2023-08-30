const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers/index");
const Joi = require("joi");

const emailRegexp = /[^\s@]+@[^\s@]+\.[^\s@]+/;

const userSchema = new Schema(
 {
  password: {
   type: String,
   required: [true, "Password is required"],
   minlength: 6,
  },
  email: {
   type: String,
   required: [true, "Email is required"],
   unique: true,
   match: emailRegexp,
  },
  subscription: {
   type: String,
   enum: ["starter", "pro", "business"],
   default: "starter",
  },
  token: {
   type: String,
   default: "",
    },
    avatarURL: {
      type: String,
      required: true,
  }
 },
 { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
 password: Joi.string().min(6).required(),
 email: Joi.string().pattern(emailRegexp).required(),
 subscription: Joi.string(),
 token: Joi.string(),
});

const loginSchema = Joi.object({
 password: Joi.string().min(6).required(),
 email: Joi.string().pattern(emailRegexp).required(),
});

const validSubscriptionValues = ["starter", "pro", "business"];
const updateUserSubscriptionSchema = Joi.object({
 subscription: Joi.string()
  .valid(...validSubscriptionValues)
  .messages({
   "any.required": "Subscription field is required",
   "string.base": "Subscription field must be a string",
  })
  .required(),
});

const schemas = {
 registerSchema,
 loginSchema,
 updateUserSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
 User,
 schemas,
};
