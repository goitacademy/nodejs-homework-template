const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const bcrypt = require("bcryptjs");

// MANGOOSE SCHEMA
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

// // OPTION #2 Set hash password during Registation
// userSchema.methods.setPassword = function (password) {
//   this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// };

// // OPTION #2 Compare password what entered to what is in DB
// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

// MANGOOSE MODEL
const User = model("user", userSchema);

// JOI REGISTRATION SCHEMA
const joiRegistrationSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

// JOI LOGIN SCHEMA
const joiLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

// PATCH SUBSCRIPTION JOI SCHEMA
const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

module.exports = {
  User,
  joiRegistrationSchema,
  joiLoginSchema,
  subscriptionJoiSchema,
};
