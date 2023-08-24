const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const listSubscription = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      //   minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: listSubscription,
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

const registerAndLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const changeUserSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...listSubscription)
    .required()
    .messages({ "any.required": "missing field subscription" }),
});

const schemas = {
  registerAndLoginSchema,
  changeUserSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};