const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../middlewares");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
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
});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const User = model("user", userSchema);
const schemas = { registerSchema, loginSchema };

module.exports = { User, schemas };
