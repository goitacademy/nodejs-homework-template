const { Schema, model } = require("mongoose");
const Joi = require("joi");
const userSchema = new Schema(
  {
     name:{
      type: String,
      required: [true, "Name is required"],
    },
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
    owner: {
      type: String,
      ref: "user",
        },
        token: String,
    avatarURL: String, 
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  },
  { versionKey: false, timestamps: true },
);

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
  name: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});
const updateBySubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
const EmailSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
}
)
const schemas = {
  registerSchema,
  loginSchema,
  updateBySubscriptionSchema,
  EmailSchema,
};

const User = model("user", userSchema);

module.exports = {
  schemas,
  User,
};
