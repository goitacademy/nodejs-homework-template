const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleSchemaValidationErrors = require("../helpers/handleSchemaValidationErrors")

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
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSchemaValidationErrors);

const User = model("user", userSchema);

const joiSignupSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

module.exports = {
  User,
  joiSignupSchema,
  joiLoginSchema,
};
