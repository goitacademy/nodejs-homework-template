import Joi from "joi";
import { Schema, model } from "mongoose";
import { hooks } from "../helpers/index.js";

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const subscriptionList = ["starter", "pro", "business"];

const usersSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 7,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    avatarURL: { type: String },

    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      // required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false }
);

export const userSingUp = Joi.object({
  password: Joi.string().min(7).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid(...subscriptionList),
});

export const userSingIn = Joi.object({
  password: Joi.string().min(7).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

export const subscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

usersSchema.post("save", hooks.handelSaveError);
usersSchema.pre("findOneAndUpdate", hooks.runValidators);
usersSchema.post("findOneAndUpdate", hooks.handelSaveError);

const User = model("user", usersSchema);

export default User;
