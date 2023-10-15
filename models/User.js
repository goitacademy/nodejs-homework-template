import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

import { addFieldMongoose, addFieldJoi } from "./validation.tools.js";

const userShemaValidation = {
  password: {
    regExp:
      /(?=.*[0-9])(?=.*[!@#$%^&*()\-\_=+,<.>/?;:'\[\]{}|])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()\-\_=+,<.>/?;:'\[\]{}|]+/,
    errorMessage:
      "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character",
    requiredErrorMessage: "Set password for user",
  },
  email: {
    regExp:
      /^([0-9A-Za-z]{1}([-_\.]?[0-9A-Za-z]+)*)@(([0-9A-Za-z]{1}([-_]?[0-9A-Za-z]+)*\.){1,2}[A-Za-z]{2,})$/,
    errorMessage: "Field email must be a valid email",
    requiredErrorMessage: "Email is required",
  },
};

const messagesSubscriptionErrors = {
  "string.empty": "missing field {#label}",
  "any.required": "missing field {#label}",
};

const subscriptionList = ["starter", "pro", "business"];
//============== Mongoose ===============================
const userSchema = new Schema(
  {
    password: {
      ...addFieldMongoose(userShemaValidation.password),
      minlength: 8,
    },
    email: { ...addFieldMongoose(userShemaValidation.email), unique: true },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

//================= Joi ==================================
export const userSchemaSignup = Joi.object({
  password: addFieldJoi.call(Joi, userShemaValidation.password).min(8),
  email: addFieldJoi.call(Joi, userShemaValidation.email),
  subscription: Joi.string().valid(...subscriptionList),
});

export const userSchemaSignin = Joi.object({
  password: addFieldJoi.call(Joi, userShemaValidation.password).min(8),
  email: addFieldJoi.call(Joi, userShemaValidation.email),
});

export const userSchemaSubscription = Joi.object({
  subscription: Joi.string()
    .required()
    .valid(...subscriptionList)
    .messages(messagesSubscriptionErrors),
});

export default User;
