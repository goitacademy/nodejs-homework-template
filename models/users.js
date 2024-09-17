const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const Joi = require("joi");

const usersSchema = new Schema(
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
      required: [true, "Avatar is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifycationCode: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

usersSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const userEmailSchema = Joi.object({
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const updateStatusSchema = Joi.object({
  subscription: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateStatusSchema,
  userEmailSchema,
};

const User = model("user", usersSchema);

module.exports = { User, userJoiSchemas: schemas };