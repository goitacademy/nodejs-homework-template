const { Schema, model } = require("mongoose");
const Joi = require("joi");

const user = new Schema(
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
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);
const User = model("users", user);

const schemas = {
  userValidation: (req, res, next) => {
    const schemaUser = Joi.object({
      password: {
        type: String,
        required: [true, "Set password for user"],
      },
      email: {
        type: String,
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
        required: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
      },
      token: String,
    });
    const validateUser = schemaUser.validate(req.body);
    console.log(validateUser);
    if (validateUser.error) {
      return res.status(400).json({ message: `${validateUser.error}` });
    }
    next();
  },
};

module.exports = { User, schemas };
