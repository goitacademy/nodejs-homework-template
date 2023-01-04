const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("Joi");

const userSchema = new Schema({
    password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  avatarURL: {
    type: String,
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const schemas = {
  signupSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
