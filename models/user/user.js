const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../../utils");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionTypes = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 5,
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
      enum: subscriptionTypes,
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid(...subscriptionTypes),
});

const loginSchema = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),
});

const schemas = { registerSchema, loginSchema, updateSubscriptionSchema };

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
