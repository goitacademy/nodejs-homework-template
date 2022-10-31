const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
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
      default: null,
    },
    avatarURL:{
      type: String,
      required: true,
    },
    verify: {
    type: Boolean,
    default: false,
  },
    verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  },    
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const registerJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  
});

const loginJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  
});

module.exports = { User, registerJoiSchema, loginJoiSchema };
