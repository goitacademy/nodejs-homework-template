import { Schema, model } from "mongoose";

import Joi from "joi";
import { handleSaveError } from './hooks.js'
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlenth: 6,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
    },
    avatarURL: {
      type: String,
      required: [true, "set avatarURL"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
});
userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": `"email" is a required field` }),
  password: Joi.string()
    .required()
    .messages({ "any.required": `"password" is a required field` }),
});

export const userSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password:Joi.string().min(6).required(),

})

const User = model("user", userSchema)
export default User