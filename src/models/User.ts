import { Schema, model } from "mongoose";
import { handleSaveErr, handlePreUpdate } from "./hooks";
import Joi from "joi";
import { UserDocument } from "../types/index";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema<UserDocument>(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minLength: 6,
    },
    email: {
      type: String,
      required: [true, "Set email for user"],
      match: emailRegex,
      unique: true,
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
    avatarURL: {
      type: String,
      required: [true, "set avatarURL"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", function name(next) {
  handlePreUpdate.call(this, next);
});

userSchema.post("save", handleSaveErr);
userSchema.post("findOneAndUpdate", handleSaveErr);

export const userSignupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string()
    .pattern(emailRegex)
    .required()
    .messages({ "any.required": `"email" is a required field` }),
  password: Joi.string()
    .required()
    .messages({ "any.required": `"password" is a required field` }),
});

export const userSigninSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegex)
    .required()
    .messages({ "any.required": `"email" is a required field` }),
  password: Joi.string()
    .required()
    .messages({ "any.required": `"password" is a required field` }),
});

export const userUpdateSubcsriptionSchema = Joi.object({
  subscription: Joi.string()
    .required()
    .messages({ "any.required": `"subscription" is a required field` }),
});

export const repeadUserVerifySchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegex)
    .required()
    .messages({ "any.required": `"email" is a required field` }),
});

const User = model("user", userSchema);

export default User;
