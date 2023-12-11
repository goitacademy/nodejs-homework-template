import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

const statusUser = ["starter", "pro", "business"];
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// userSchema mongoose
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: statusUser,
      default: "starter",
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true, // Вказуємо що поле має бути унікальне (e-maill)
      required: [true, "Email is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    token: String,
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", preUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);
export default User;

// END userSchema mongoose
export const userSignupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...statusUser),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().min(6).required(),
});

export const userVerifySchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
  }),
});
