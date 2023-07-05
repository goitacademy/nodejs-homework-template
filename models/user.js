const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
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
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const schemas = {
  registerSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
