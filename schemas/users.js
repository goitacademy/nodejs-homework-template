// const mongoose = require("mongoose");
// const { Schema, model } = mongoose;
// const Joi = require("joi");
const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
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
  { versionKey: false, timestamps: true }
);

// const joiSchemaUser = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   // subscription: Joi.string().required().default(starter),
//   subscription: Joi.string().required(),
//   token: Joi.string().default(null),
// });
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const joiSchema = Joi.object({
  password: Joi.string().min(10).required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const User = model("user", userSchema);
// console.log(User);

model.exports = {
  User,
  joiSchema,
};
