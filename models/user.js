const { Schema, model } = require("mongoose");
const Joi = require("joi");

const STATUS_SUBSCRIPTION = {
  STARTER: "starter",
  PRO: "pro",
  BUSINESS: "business",
};

// Валідатор даних на сервері
const schemaDBUserValidator = new Schema(
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
      enum: [
        STATUS_SUBSCRIPTION.STARTER,
        STATUS_SUBSCRIPTION.PRO,
        STATUS_SUBSCRIPTION.BUSINESS,
      ],
      default: STATUS_SUBSCRIPTION.STARTER,
    },
    token: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

const User = model("user", schemaDBUserValidator);

// Валідатори отриманих з клієнта даних
const userValidator = Joi.object({
  password: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

const userSubscriptionValidator = Joi.object({
  subscription: Joi.valid(...Object.values(STATUS_SUBSCRIPTION)).required(),
});

const schemas = { userValidator, userSubscriptionValidator };

module.exports = { schemas, User };
