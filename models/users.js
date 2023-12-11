const mongoose = require("mongoose");
const { Schema } = mongoose;
const gravatar = require("gravatar");

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
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: "250", d: "retro", r: "pg" }, true);
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
