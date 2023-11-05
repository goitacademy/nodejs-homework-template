const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleSaveError, runValidatorsAtUpdate } = require("./hooks");

const subscriptionTypes = ["starter", "pro", "business"];

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
      enum: subscriptionTypes,
      default: "starter",
    },
    avatarURL: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

const userAuthSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid(...subscriptionTypes),
});

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .required()
    .valid(...subscriptionTypes),
});

const User = model("user", userSchema);

module.exports = {
  userAuthSchema,
  userSubscriptionSchema,
  User,
};
