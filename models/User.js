import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

const subscriptionOptions = ["starter", "pro", "business"];
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
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
      enum: subscriptionOptions,
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", preUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    "any.required": `missing required email field`,
    "string.base": `"email" must be text`,
  }),
  password: Joi.string().required().messages({
    "any.required": `missing required password field`,
    "string.base": `"password" must be text`,
  }),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    "any.required": `missing required email field`,
    "string.base": `"email" must be text`,
  }),
  password: Joi.string().required().messages({
    "any.required": `missing required password field`,
    "string.base": `"password" must be text`,
  }),
});

export const userSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionOptions)
    .required(),
  // .message({ "any.required": `missing field subscription` }),
});

const User = model("user", userSchema);

export default User;
