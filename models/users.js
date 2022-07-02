const { Schema, model } = require("mongoose");
const Joi = require("joi");

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
    avatarURL:{
      type:String,
      required:true
    }
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const joiUserRegisterSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string()
    // .regex(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .trim()
    .required(),
  subscription: Joi.string()
    .default("starter")
    .valid("starter", "pro", "business")
    .trim(),
  token: [Joi.string(), Joi.number()],
});

const joiUserLoginSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string()
    // .regex(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .trim()
    .required(),
});

const joiUserSubscriptionUpdateSchema = Joi.object({
  subscription: Joi.any().valid("starter", "pro", "business"),
});

module.exports = {
  User,
  joiUserRegisterSchema,
  joiUserLoginSchema,
  joiUserSubscriptionUpdateSchema,
};
