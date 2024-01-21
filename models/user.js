const Joi = require("joi");
const { Schema, model } = require("mongoose");

const patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/,
};

const userSchema = Joi.object({
  email: Joi.string().pattern(patterns.email).required(),
  password: Joi.string().pattern(patterns.password).required(),
});

const modelUserSchema = new Schema(
  {
    email: {
      type: String,
      match: patterns.email,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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

const User = model("user", modelUserSchema);

module.exports = { User, userSchema };
