const { Schema } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs"); // для хеширования пароля

const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const userSchema = Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: emailRegex,
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    // сохраняем токен в базе данных
    type: String,
    default: null,
  },
});

// хеширование пароля с помощью bcryptjs
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
// password - пароль, который пользователь ввел
// this.password - его реальный пароль, который уже захеширован

// пишем валидацию с помощью Joi
const joiSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ru", "ukr"] },
    }),
  subscription: Joi.string(),
  token: Joi.string(),
});

module.exports = {
  userSchema,
  joiSchema,
};
