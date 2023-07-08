const Joi = require("joi");
const mongoose = require("mongoose");
const { handleMongooseError } = require("../helpers");
const gravatar = require("gravatar");
const schema = mongoose.Schema(
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
    avatarURL: {
      type: String,
      default: gravatar.profile_url(this.email),
    },
  },
  { versionKey: false, timestamps: true }
);

schema.post("save", handleMongooseError);

const User = mongoose.model("users", schema);
const schemaSignup = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  repeat_password: Joi.ref("password"),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const schemaLogin = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  repeat_password: Joi.ref("password"),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});
const schemaSubscription = Joi.object({
  subscription: Joi.string().required(),
});
module.exports = { User, schemaSignup, schemaLogin, schemaSubscription };
