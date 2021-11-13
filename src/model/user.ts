import { Schema, model } from "mongoose";
import joi from "joi";
import bcrypt from "bcrypt";
import PasswordComplexity from "joi-password-complexity";
import { SALT_COUNT } from "./../config";

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

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_COUNT));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiUserSchema = joi.object({
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
});

const User = model("user", userSchema);

export { userSchema, joiUserSchema, User };
