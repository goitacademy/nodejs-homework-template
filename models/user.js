const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers");
const Joi = require("joi");

const emailRegexp = /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
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

const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().required().min(6),
});

const userLoginSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().required().min(6),
});

const schemas = {
  userLoginSchema,
  userRegisterSchema,
};

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};