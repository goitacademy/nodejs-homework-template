const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleSaveErrors = require("../helpers/handleSaveError");

const subscriptionType = ["starter", "pro", "business"];

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionType)
    .required(),
});

const User = model("user", userSchema);

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
};

module.exports = { schemas, User };
