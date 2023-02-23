const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleErrors } = require("../helpers/handeErrors");

const userRegistrationJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const userLoginJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const JoiSchemas = {
  userRegistrationJoiSchema,
  userLoginJoiSchema,
};

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
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleErrors);

const User = model("user", userSchema);

module.exports = {
  User,
  JoiSchemas,
};
