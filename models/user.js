const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../middlewares");

const nameRegexp = /^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/;
const emailRegexp = /^.+@.+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for sign up"],
      minlength: 3,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Set email for sign up"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  name: Joi.string().min(3).pattern(nameRegexp).trim().required(),
  email: Joi.string().email().trim().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
