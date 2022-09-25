const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
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
  { versionKey: false }
);

const joiSchema = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

const userModel = model("user", userSchema);

module.exports = { userModel, joiSchema };
