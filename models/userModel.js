const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  avatarURL: String,

  token: String,
});

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
    this.avatarURL = gravatar.url(
      this.email,
      { s: "100", r: "x", d: "retro" },
      false
    );
  }
  next();
});
const User = model("user", userSchema);

module.exports = {
  User,
};
