const Joi = require("joi");
// const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// joiSchema-нужна для валидации тела запроса
const joiSignupSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});
const joiLoginSchema = Joi.object({
  // name: Joi.string().min(2).max(30).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      // required: false,
      default: null,
    },
    avatarURL: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

// методы схем
// userSchema.methods.setPassword = function (password) {
//   this.password = bcrypt.hachSync(password, bcrypt.genSaltSync(10));
// };
// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

const User = model("user", userSchema);

module.exports = { joiSignupSchema, joiLoginSchema, User };
