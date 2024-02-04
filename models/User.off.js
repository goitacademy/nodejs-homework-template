import mongoose, { Schema } from "mongoose";
import bCrypt from "bcrypt";

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

//register
userSchema.methods.setPassword = async function (password) {
  this.password = await bCrypt.hash(password, 6);
};

//login
userSchema.methods.validatePassword = async function (password) {
  return bCrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);

export default User;
