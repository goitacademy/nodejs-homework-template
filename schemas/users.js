import { Schema } from "mongoose";
import mongoose from "mongoose";
import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // example@example.com

const user = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});

export const User = mongoose.model("user", user);

export const registerSchema = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email format is: example@example.com",
  }),
  password: Joi.string().min(6).required(),
});
