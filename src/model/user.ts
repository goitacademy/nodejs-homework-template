import { Schema, model } from "mongoose";
import joi from "joi";
import { patterns } from "./../helpers";

let joiUserSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required(),

  password: joi
    .string()
    .length(8)
    .pattern(patterns.password, "password")
    .required(),
});

const userSchema = new Schema({
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

const User = model("User", userSchema);

export { userSchema, joiUserSchema, User };
