import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

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

user.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

user.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export const User = model("user", user);
