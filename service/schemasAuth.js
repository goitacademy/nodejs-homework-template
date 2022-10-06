const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleSaveErrors = require("../helpers/handleSaveErrors");
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
    token: String,
    default: "",
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
      token: Joi.string(),
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
};

module.exports = { User, schemas };
