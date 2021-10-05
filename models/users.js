const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema({
  password: {
    type: String,
        required: [true, 'Password is required'],
    minlength:6,
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
  token: {
    type: String,
    default: null,
},
}, {versionKey: false, timestamps: true})

const joiSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string()/* .required() */,
    token: Joi.string()/* .required() */,
})

const User = model("user", userSchema);

module.exports = {
    User,
    joiSchema
}