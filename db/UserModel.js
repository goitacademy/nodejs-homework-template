const mongoose = require("mongoose");
const { handleMongooseError } = require("../helpers/handleMongooseError");
const Joi = require("Joi");

const emailRegexp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const subscriptionList = ["starter", "pro", "business"];
const userShema = new mongoose.Schema(
  {
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },

    name: { type: String, require: true },
    avatarURL: { type: String, require: true },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);
userShema.post("save", handleMongooseError);
const User = mongoose.model("User", userShema);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  avatarURL: Joi.string().optional(),
  email: Joi.string().pattern(emailRegexp).required(),
  //   email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.object({
    subscription: Joi.string()
      .valid(...subscriptionList)
      .optional(),
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  //   email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

// const avatarUpdateSchema = Joi.object({
//   subscription: Joi.string()
//     .valid(...subscriptionList)
//     .required(),
// });
const subscriptionUpdateSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});
const verifySchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});
const schemas = {
  registerSchema,
  loginSchema,
  subscriptionUpdateSchema,
  verifySchema,
};

module.exports = {
  User,
  schemas,
};
module.exports = { User, schemas };
