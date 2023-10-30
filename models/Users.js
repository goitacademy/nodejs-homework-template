const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveError, runValidatorsAtUpdate } = require("./hooks");

const usersSchema = new Schema(
  {
    username: { type: String, required: true },
    password: {
      type: String,
      minlength: 6,
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
