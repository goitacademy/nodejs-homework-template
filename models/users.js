const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

///users schema
const emailReg =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minLength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [emailReg, "email has formats like: email@email.com"],
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

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
//I compare the password with the database
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiUserSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required().pattern(emailReg),
  subscription: Joi.string(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required().pattern(emailReg),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = {
  joiUserSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  User,
};
