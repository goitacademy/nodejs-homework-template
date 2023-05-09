const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const usertSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user minimum length 6"],
    },
    email: {
      type: String,
      match: emailRegex,
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
  {
    versionKey: false,
    timestamps: true,
  }
);

usertSchema.post("save", handleMongooseError);

const User = model("contact", usertSchema);

module.exports = User;
