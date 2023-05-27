const mongoose = require("mongoose");
const { handleMongooseError } = require("../utils/errors");

const user = mongoose.Schema(
  {
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
    token: String,
  },
  { versionKey: false, timestamps: true }
);

user.post("save", handleMongooseError);

const User = mongoose.model("user", user);

module.exports = User;
