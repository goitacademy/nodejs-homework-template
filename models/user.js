const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userShema = Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
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
  token: String
},{versionKey: false, timestamps: true});

const joiUserSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string(),
});


const User = model("user", userShema);


module.exports = {
    User,
    joiUserSchema
};
