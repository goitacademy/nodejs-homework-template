const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { hendleSave } = require("../helpers");
const subscriptionType = ["starter", "pro", "business"];

const userSchema = new Schema(
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
      enum: subscriptionType,
      default: "starter",
    },
    token: { type: String },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);
const registerSchems = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email(),
  subscription: Joi.string().valid(...subscriptionType),
});
const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email(),
});
userSchema.post("save", hendleSave);
const User = model("user", userSchema);

const schemas = {
  registerSchems,
  loginSchema,
};
module.exports = {
  User,
  schemas,
};
