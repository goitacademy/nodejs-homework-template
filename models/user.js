const Joi = require("joi");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const users = new Schema({
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
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
});

const hashPassword = (pass) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(pass, salt);
  return hashedPassword;
};

const User = mongoose.model("user", users);

const userValidationSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required().email(),
});

module.exports = { User, userValidationSchema, hashPassword };
