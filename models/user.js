import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongooseError } from "../helpers/handleMangooseError.js";

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // example@example.com
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: [emailRegexp, "Invalid email format provided"],
      required: [true, "Email is required"],
      index: true,
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { timeseries: true, versionKey: false }
);

userSchema.post("save", handleMongooseError);

export const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email format must be - example@example.com",
  }),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscriptionList),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const subscriprionSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptionList),
});

export const updateAvatarSchema = Joi.object({
  payload: { files: Joi.array().items(Joi.any()) },
});

export const User = model("user", userSchema);
