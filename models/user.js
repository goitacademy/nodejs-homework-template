const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utilities");

const emailRegexp =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    // },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
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
  },
  { versionKey: false, timestamp: true }
);

userSchema.post("save", handleMongooseError);

// const registerSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().pattern(emailRegexp),
//   password: Joi.string().min(6).required(),
// });

// const loginSchema = Joi.object({
//   email: Joi.string().pattern(emailRegexp),
//   password: Joi.string().min(6).required(),
// });

const registerLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
  // registerSchema,
  // loginSchema,
  registerLoginSchema,
  updateSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
