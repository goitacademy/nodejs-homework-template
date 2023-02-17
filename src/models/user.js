const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: { 
      type: String, 
      required: [true, "URL is required"] },
      
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },

  { versionKey: false, timestamps: true }
);

const joiSignupSchema = Joi.object({
  password: Joi.string().min(7).required(),
  email: Joi.string().required(),
  subscription: Joi.string().valueOf("starter", "pro", "business"),
  token: Joi.string(),
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiUpdateUserSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const User = model("user", userSchema);

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

module.exports = { joiSignupSchema, joiUpdateUserSchema, verifyEmailSchema, User };

// const joiLoginSchema = Joi.object({
//   password: Joi.string().min(7).required(),
//   email: Joi.string().email({ minDomainSegments: 2 }).required(),
// });
