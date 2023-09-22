const { Schema, model } = require("mongoose");
const Joi = require("joi");

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("users", userSchema);

const validateUserSchemaRegister = Joi.object({
  password: Joi.string().min(1).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  subscription: Joi.string(),
});

const validateUserSchemaLogin = Joi.object({
  password: Joi.string().min(1).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
  
});

module.exports = {
  User,
  validateUserSchemaRegister,
  validateUserSchemaLogin,
};
