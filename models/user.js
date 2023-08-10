const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: emailRegexp,
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const registerShema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const loginShema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

userSchema.post("save", handleMongooseError);

const sсhemas = {
  registerShema,
  loginShema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  sсhemas,
};
