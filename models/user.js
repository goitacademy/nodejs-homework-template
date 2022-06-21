import mongoose from "mongoose";
import Joi from "joi";

const { Schema, model } = mongoose;

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
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
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const joiUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const joiVerifySchema = Joi.object({
  email: Joi.string().required(),
});

const User = model("user", userSchema);

const userModel = {
  User,
  joiUserSchema,
  joiVerifySchema,
};

export default userModel;
