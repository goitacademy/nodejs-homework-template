const { Schema, model } = require("mongoose");

const { handleMangooseError } = require("../utils");

const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    avatarURL: String,
    token: String
  });

  userSchema.post("save", handleMangooseError);

  const UserLeaveSchema = model("user", userSchema);

  module.exports = UserLeaveSchema;