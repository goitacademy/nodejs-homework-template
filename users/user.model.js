import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import crypto from "crypto";
import { Schema } from "mongoose"; // Import the 'Schema' object from 'mongoose'

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
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
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

userSchema.pre("save", async function (next) {
  const user = this; // Używamy obiektu "this" zamiast "user"

  if (user.isModified("password")) {
    // Hashowanie hasła, jeśli zostało zmodyfikowane
    user.password = await bcrypt.hash(user.password, 8);
  }

  if (!user.avatarURL) {
    // Generowanie domyślnego avatara, jeśli nie istnieje
    const avatarURL = gravatar.url(user.email, { s: "200", r: "pg", d: "mm" }); // Poprawiamy user,email na user.email
    user.avatarURL = avatarURL; // Przypisanie avatarURL do pola avatarURL użytkownika
  }

  if (!user.verificationToken) {
    // Generowanie tokenu weryfikacyjnego, jeśli nie istnieje
    user.verificationToken = crypto.randomBytes(16).toString("hex");
  }

  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.token = token;
  await user.save();
  return token;
};

const User = mongoose.model("User", userSchema);

export default User;

// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (!this.password) {
//     return;
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// userSchema.methods.validatePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// const User = mongoose.model("User", userSchema);

// module.exports = {
//   User,
// };
