const { model, Schema } = require("mongoose");
const { handleMongooseError } = require("../utils");
const joi = require("joi");
// model Schema
const modelSchema = new Schema(
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
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

modelSchema.post("save", handleMongooseError);

// ---------- joi schema ----------------------

const authSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const User = model("user", modelSchema);

module.exports = {
  User,
  authSchema,
};
