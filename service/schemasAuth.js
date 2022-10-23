const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");
const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
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
    avatarURL: {
      type: String,
      // required: true,
    },
    token: String,
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
userSchema.post("save", handleSaveErrors);
const User = model("users", userSchema);

const schemas = {
  userValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string().alphanum().min(2).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),
      subscription: Joi.string().alphanum(),
      avatarURL: Joi.string(),
      // token: Joi.string(),
    });
    const validateUser = schema.validate(req.body);
    if (validateUser.error) {
      return res.status(400).json({ message: `${validateUser.error}` });
    }
    next();
  },
  loginValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string().alphanum().min(2).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),
    });
    const validateLogin = schema.validate(req.body);
    if (validateLogin.error) {
      return res.status(400).json({ message: `${validateLogin.error}` });
    }
    next();
  },
  subscriptionValidation: (req, res, next) => {
    const schema = Joi.object({
      subscription: Joi.string().valid("starter", "pro", "business").required(),
    });
    const validateLogin = schema.validate(req.body);
    if (validateLogin.error) {
      return res.status(400).json({ message: `${validateLogin.error}` });
    }
    next();
  },
  verifyEmailSchema: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().required(),
    });
    const verifyEmail = schema.validate(req.body);
    if (verifyEmail.error) {
      return res.status(400).json({ message: "missing required field email" });
    }
    next();
  },
};

module.exports = { User, schemas };
