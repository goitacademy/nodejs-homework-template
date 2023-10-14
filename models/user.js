const { Schema, model } = require("mongoose");

const Joi = require("joi");

const HandleMongooseError = require("../helpers/handleMongooseError.js");

const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    match: emailValid,
    required: [true, "Email is required"],
    unique: true,
  },
  token: {
    type: String,
    default: "",
  },
  avatarURL: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    default: "",
  },
});

userSchema.post("save", HandleMongooseError) ;

const registerShema = Joi.object({
  subscription:Joi.string().required(),
    email:Joi.string().pattern(emailValid).required(),
    password:Joi.string().min(6).required(),
})

const emailShema = Joi.object({
  email: Joi.string().pattern(emailValid).required(),
});


const loginShema = Joi.object({
    
    email:Joi.string().pattern(emailValid).required(),
    password:Joi.string().min(6).required(),
})

const schemas = {
  registerShema,
  loginShema,
  emailShema,
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,

}