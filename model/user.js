// const { Schema, model } = require("mongoose");

const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// const Joi = require("joi");

const userSchema = Schema({
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
});

// const JoiSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   subscription: Joi.string().required().default(starter),
//   token: Joi.string().default(null),
// });

const User = model("users", userSchema);

module.exports = {
  User,
  // JoiSchema,
};
