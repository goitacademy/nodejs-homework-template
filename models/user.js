const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: [true, "Avatar URL is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().min(3).email().required().messages({
    "any.required": `missing required email field`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required password field`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().min(3).email().required().messages({
    "any.required": `missing required email field`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required password field`,
  }),
});

const userEmailSchema = Joi.object({
  email: Joi.string().min(3).email().required().messages({
    "any.required": `missing required email field`,
  }),
});

const updateSubsSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
}).messages({
  "string.valid": `required subscription field must be one of starter, pro or business`,
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSubsSchema,
  userEmailSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
