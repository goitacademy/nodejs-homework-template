const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveError, runValidatorsAtUpdate } = require("./hooks.js");

// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 4,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      //   match: emailRegexp,
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

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

const userSignupSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(4).required(),
  subscription: Joi.string(),
});

const userSigninSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(4).required(),
});

const User = model("user", userSchema);

module.exports = {
  userSignupSchema,
  userSigninSchema,
  User,
};
