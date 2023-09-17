const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers/handleMongooseError");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

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

userSchema.post("save", handleMongooseError);

const usersSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "missing required password field" }),
});

const emptyBody = Joi.object()
  .min(1)
  .messages({ "object.min": "Missing fields" });

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({ "any.required": "missing required subscription field" }),
});

const schemas = {
  usersSchema,
  emptyBody,
  subscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
