import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError } from "./hooks.js";

const emailRegExp = /^.+@.+\..+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Set password for user"],
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
  },
  { versionKey: false },
  { timestamps: true }
);

userSchema.post("save", handleSaveError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(8).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});


const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model("user", userSchema);

export default {
   User,
   schemas,

};
