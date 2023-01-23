const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");
const emailRegexp =
 /^(([^<>()/[\]\\.,;:\s@"]+(\.[^<>()/[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const userSchema = new Schema(
 {
  name: {
   type: String,
   required: true,
  },
  email: {
   type: String,
   unique: true,
   match: emailRegexp,
   required: true,
  },
  password: {
   type: String,
   minlength: 6,
   required: true,
  },
  avatarURL: {
   type: String,
   required: true,
  },
  token: {
   type: String,
  },
  verify: {
   type: Boolean,
   default: false,
  },
  verificationToken: {
   type: String,
   required: [true, "Verify token is required"],
  },
 },
 { versionKey: false, timestamps: true },
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
 name: Joi.string().required(),
 email: Joi.string().pattern(emailRegexp).required(),
 password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
 email: Joi.string().pattern(emailRegexp).required(),
 password: Joi.string().min(6).required(),
});
const schemas = {
 registerSchema,
 loginSchema,
};

const User = model("user", userSchema);

module.exports = {
 User,
 schemas,
};
