const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
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
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleMongooseError);
const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
const schema = {
  registerSchema,
  loginSchema,
};
const User = model("user", userSchema);
module.exports = {
  User,
  schema,
};
