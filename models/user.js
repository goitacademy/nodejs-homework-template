const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const statusList = ["starter", "pro", "business"];

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
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
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

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model("user", userSchema);

const joiSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid(...Object.values(statusList)),
  password: Joi.string().min(8).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  subscription: Joi.string().valid(...Object.values(statusList)),
  password: Joi.string().min(8).required(),
});

const joiUpdateSubSchema = Joi.object({
    subscription: Joi.string().valid(...Object.values(statusList)),
});


module.exports = {
  User,
  joiSignupSchema,
  joiLoginSchema,
  joiUpdateSubSchema,
};
