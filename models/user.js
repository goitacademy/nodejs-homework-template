const { Schema, model } = require("mongoose");
const httpErr = require("../utils/HTTPErr");

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

userSchema.post("save", (error, data, next) => {
  if (error) {
    next(httpErr(400, "Bad Request"));
  }
  next();
});

const User = model("user", userSchema);

module.exports = User;
