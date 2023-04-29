import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";

const contacts = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
  },
  { versionKey: false }
);

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
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false }
);

userSchema.methods.setHashPassword = function (password) {
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));

  return (this.password = hashPassword);
};

userSchema.methods.validatePassword = function (password) {
  const checkPassword = bcrypt.compareSync(password, this.password);
  return checkPassword;
};

export const Contact = model("contact", contacts);
export const User = model("user", userSchema);
