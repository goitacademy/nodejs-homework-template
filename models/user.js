const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../middleware");

const emailRegexp =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
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
      default: "",
    },
  }

  // Богдан Лямзин
  // {
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   email: {
  //     type: String,
  //     match: emailRegexp,
  //     unique: true,
  //     required: true,
  //   },
  //   password: {
  //     type: String,
  //     minLength: 6,
  //     required: true,
  //   },
  //   token: {
  //     type: String,
  //     default: "",
  //   },
  // },
  // { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
