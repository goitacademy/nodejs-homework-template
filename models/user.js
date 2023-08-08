import Joi from "joi";
import { Schema, model } from "mongoose";
import hooks from "./hooks.js";
import { emailRegxp, subscriptionList } from "../constants/authConstants.js";
// import { handleMongooseError } from "../helpers/index.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegxp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

userSchema.post("save", hooks.handleSaveError);
userSchema.post("findOneAndUpdate", hooks.handleSaveError);
userSchema.pre("findOneAndUpdate", hooks.validateAtUpdate);

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegxp).required(),
  password: Joi.string().min(6).required(),
});

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegxp).required().messages({
    "string.base": `email should be a type of 'text'`,
    "string.empty": `email cannot be an empty field`,
    "any.required": `email is a required field`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": `password should be a type of 'text'`,
    "string.empty": `password cannot be an empty field`,
    "string.min": `password should have a minimum length of {#6}`,
    "any.required": `password is a required field`,
  }),
  subscription: Joi.string()
    .valid(...subscriptionList)
    .default("starter"),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required()
    .messages({
      "string.base": `subscription should be a type of 'text'`,
      "string.empty": `subscription cannot be an empty field`,
      "any.required": `missing required subscription field`,
    }),
});

export const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model("user", userSchema);
export default User;
