const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {
  handleSaveError,
  runValidatorsAsUpdate,
} = require("../models/hooks.js");

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 8);
  }
  next();
});

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", runValidatorsAsUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = mongoose.model("user", userSchema);

module.exports = User;

module.exports = {
  userSignUpSchema: Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),
    subscription: Joi.string()
      .valid("starter", "pro", "business")
      .default("starter"),
  }),
  userSignInSchema: Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),
  }),
  userEmailSchema: Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
  }),
  addUserSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
  loginUserSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  updateUserSchema: Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(8),
  }),
};
