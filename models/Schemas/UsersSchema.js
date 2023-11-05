const { Schema, model } = require("mongoose");
const bCrypt = require("bcryptjs");
const Joi = require("joi");

const user = new Schema({
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
  avatarURL: String,
  token: {
    type: String,
    default: null,
  },
});

user.methods.setPass = function (pass) {
  this.password = bCrypt.hashSync(pass, bCrypt.genSaltSync(6));
};

user.methods.isSamePass = function (pass) {
  return bCrypt.compareSync(pass, this.password);
};

user.methods.setToken = function (token) {
  this.token = token;
};
const User = model("user", user);

const userSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
    .error(new Error("The password must contain a minimum of 8 characters"))
    .required(),
});

module.exports = { User, userSchema };
