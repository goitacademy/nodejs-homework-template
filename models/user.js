
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
    },
        avatarURL: String,
        token: {
            type: String,
            default: null,
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);



const signUpSchema = Joi.object({
  password: Joi.string()
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  subscription: Joi.string(),
  token: Joi.string().token(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  token: Joi.string().token(),
});

const schemas = {
  signUpSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};