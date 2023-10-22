import { Schema, model } from "mongoose";
import { handleSaveError, runValidatorsAtUpdate } from "../hooks/index.js";
import Joi from "joi";

const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const subscriptionEnum = ["starter", "pro", "business"];
const userSchema = new Schema({
  password: {
      type: String,
    minlength: 8,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    match: emailRegexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscriptionEnum,
    default: "starter"
  },
  token: String,
  avatarURL: {
    type: String,
    required: true,
  },
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
     'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern, example: "example@mail.com"',
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "missing required password field",
    'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern, example: "(000) 000-0000"',
  }),
});

export const User = model("user", userSchema);