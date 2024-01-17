const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
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
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
