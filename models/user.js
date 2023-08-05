const { Schema, model } = require("mongoose");
const Joi = require("joi");
const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchemaMongoose = new Schema(
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    token: {
      type: String,
      default: "",
    },
  },
  {
    toJSON: {
      versionKey: false,
    },
  }
);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchemaMongoose);

module.exports = {
  User,
  schemas,
};
