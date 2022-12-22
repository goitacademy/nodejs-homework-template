const Joi = require("joi");
const bcrypt = require("bcrypt");
const emailExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const { model, Schema } = require("mongoose");
const subscriptionStatus = ["starter", "pro", "business"];
const userSchema = Schema(
  {
    password: {
      type: String,
      minlength: 8,

      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailExp,

      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionStatus,
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
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSalt(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const joiRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailExp).required(),
  password: Joi.string().required(),
});

const joiPatchSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionStatus)
    .required(),
});
const User = model("user", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiPatchSchema,
};
