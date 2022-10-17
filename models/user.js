const { Schema, model } = require("mongoose");
const joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const emailRegexp = /^(.+)@(.+){2,}\.(.+){2,}$/;
const subscriptionArray = ["starter", "pro", "business"];

const userShema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
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
      enum: subscriptionArray,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userShema.post("save", handleSaveErrors);

const registerShema = joi.object({
  email: joi.string().pattern(emailRegexp).required(),
  password: joi.string().min(6).required(),
  subscription: joi.string().valid(...subscriptionArray),
});

const schemas = {
  registerShema,
};

const User = model("user", userShema);

module.exports = {
  User,
  schemas,
};
