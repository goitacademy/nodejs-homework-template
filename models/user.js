const { Schema, model } = require("mongoose");
const Joi = require("joi");

const {
  handleSchemaValidationErrors,
} = require("../helpers/handleSchemaValidationErrors");

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

userSchema.post("save", handleSchemaValidationErrors);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().required(),
  repeat_password: Joi.ref("password"),
});

const schemas = {
  registerSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
