const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const userSchemas = new Schema({
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
  avatarURL: {
    type: String,
    required: true,
  },
  token: String,
});

userSchemas.post("save", handleMongooseError);
userSchemas.set("versionKey", false);

const User = model("user", userSchemas);

const registerBody = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const loginBody = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const updateSab = Joi.object({
  subscription: Joi.string().required(),
});

const schemas = {
  registerBody,
  loginBody,
  updateSab,
};

module.exports = {
  User,
  schemas,
};
