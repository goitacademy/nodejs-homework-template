const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required"],
      unique: true,
      match: [emailRegexp, "Please enter a valid email"],
    },
    avatarURL: {
      type: String,
      require: true,
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

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiRegisterSchema = Joi.object({
  password: Joi.string().min(3).max(10).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
  avatarURL: Joi.string(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(3).max(10).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  token: Joi.string(),
  avatarURL: Joi.string(),
});

const joiUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const joiUpdateAvatarSchema = Joi.object({
  avatarURL: Joi.string().required(),
});

const joiVerifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const User = model("users", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiUpdateSubscriptionSchema,
  joiUpdateAvatarSchema,
  joiVerifyEmailSchema,
};
