const { Schema, model } = require("mongoose");
const Joi = require("joi");

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema(
  {
    email: { type: String, required: true, unique: true, match: emailRegexp },
    password: { type: String, required: true, minLength: 6 },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const registerJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6),
  token: Joi.string(),
  owner: Joi.object(),
});

const User = model("user", userSchema);

const schemas = {
  register: registerJoiSchema,
};

module.exports = {
  User,
  schemas,
};
