const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const allowedSubscriptions = ["starter", "pro", "business"]

const userSchema = new Schema({
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
    default: "starter"
  },
  token: String,
});

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  password: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).max(30).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...allowedSubscriptions).required()
})

const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema
};

const User = model("user", userSchema);

module.exports = {
    User,
  schemas,
};
