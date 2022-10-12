const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleErrors } = require("../helpers");
const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
// const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
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

// userSchema.methods.setPassword = function (password) {
//   this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
// }

// описание метода для сравнения пароля
// userSchema.methods.setPassword = function (password) {
//   return bcrypt.hashSync(password, this.password);
// };

userSchema.post("save", handleErrors);

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const joiUsersSchemas = {
  joiRegisterSchema,
  joiLoginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  joiUsersSchemas,
};
