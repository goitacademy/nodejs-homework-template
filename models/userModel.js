
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
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
  avatarURL: {
    type: String,
    default: ''
  },
  verificationCode: {
    type: String
  },
  isValidated: {
    type: Boolean,
    default: false,
  },
  token: String,
});

module.exports = model("user", userSchema);
