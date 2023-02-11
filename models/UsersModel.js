const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");

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
  },
  { versionKey: false }
);

const User = mongoose.model("users", usersSchema);

const joiUsersSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
  subscription: joi.string(),
  token: joi.string(),
});

const joiLoginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const schemas = {
  register: joiUsersSchema,
  login: joiLoginSchema,
};

module.exports = { User, schemas };
