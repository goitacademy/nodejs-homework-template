const { Schema, model } = require("mongoose");
const {handleMongooseError} = require("../helpers");
const Joi = require("joi");

const emailRegexp =  /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

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
    avatarURL:{
      type: String,
    }
  
  },
  { versionKey: false, timestamps: true }
);

const userRegisterSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().required().min(6),
});

const userLoginSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().required().min(6),
});


const subscriptionUpdateSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.required": "missing field subscription",
      "any.only": "subscription must be one of 'starter', 'pro' or 'business'",
    }),
});


const schemas = {
  userLoginSchema,
  userRegisterSchema,
  subscriptionUpdateSchema,
};

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};