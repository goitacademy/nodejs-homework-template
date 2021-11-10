import { Schema, model } from "mongoose";
import joi from "joi";
import { patterns } from "./../helpers";
import PasswordComplexity from "joi-password-complexity";

let joiUserSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required(),

  password: PasswordComplexity({
    min: 8,
    max: 12,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
  }),
  // .pattern(patterns.password, "password")
});

const userSchema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

const User = model("User", userSchema);

export { userSchema, joiUserSchema, User };
