const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, versionKey: false }
);

const User = model("user", userSchema);

module.exports = User;
