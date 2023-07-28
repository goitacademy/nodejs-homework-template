const { Schema, model } = require("mongoose");
const Joi = require("joi")

const { handleMongooseError } = require("../helpers")


const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minlength:6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, //перевірка на ідентичний емейл
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
       type: String,
       default: null,
    },
  },
  {
    versionKey: false,
    // timestamps: true,
  },
);
userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

module.exports = User;

const registerSchema = Joi.object({
    email: Joi.string()
    .email()
    .trim()
    .min(10)
    .required()
    .messages({
      'string.base': `"email" must be a string`,
      'string.empty': `"email" cannot be an empty field`,
      'string.min': `"email" should have a minimum length of {#limit}`,
      'any.required': `missing required "email" field`
    }),
    password: Joi.string()
    .trim()
    .min(6)
    .required()
    .messages({
      'string.base': `"password" must be a string`,
      'string.empty': `"password" cannot be an empty field`,
      'string.min': `"password" should have a minimum length of {#limit}`,
      'any.required': `missing required "password" field`
    }),
});


const loginSchema = Joi.object({
    email: Joi.string()
    .email()
    .trim()
    .min(6)
    .max(20)
    .required()
    .messages({
      'string.base': `"email" must be a string`,
      'string.empty': `"email" cannot be an empty field`,
      'string.min': `"email" should have a minimum length of {#limit}`,
      'any.required': `missing required "email" field`
    }),
    password: Joi.string()
    .trim()
    .min(6)
    .max(16)
    .required()
    .messages({
      'string.base': `"password" must be a string`,
      'string.empty': `"password" cannot be an empty field`,
      'string.min': `"password" should have a minimum length of {#limit}`,
      'any.required': `missing required "password" field`
    }),
})

const schemas = {
    registerSchema,
    loginSchema,

  };

  module.exports = {
    User,
    schemas,
};