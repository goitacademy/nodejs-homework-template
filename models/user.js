const { Schema, model } = require("mongoose");

const { handleMongooseErr } = require("../helpers");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },

    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: { type: String, default: "" },
    avatarURL: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseErr);

const User = model("user", userSchema);

module.exports = User;
