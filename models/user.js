const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const registerJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

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

// 2) способ хешировать password - регістр
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// 2)спосіб - логін
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const User = model("user", userSchema);
module.exports = {
  User,
  registerJoiSchema,
  loginJoiSchema,
};
