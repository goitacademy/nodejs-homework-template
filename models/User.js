const gravatar = require("gravatar");
const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
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
      default: gravatar.profile_url(this.email),
    },
  },
  { versionKey: false, timestamps: true }
);
const User = model("user", UserSchema);
module.exports = User;
