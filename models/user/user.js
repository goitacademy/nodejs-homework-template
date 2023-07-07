const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../../helper");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Set password for user'],
      },
      email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
      },    
      token: String,
      avatarURL: String,
}, {versionKey: false, timestamps: true});


userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name:Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business')
});

const userSchemas = {
    registerSchema,
    emailSchema,
    loginSchema,
    subscriptionSchema,
    
}

const User = model('user', userSchema);

module.exports = {
    userSchemas,
    User,
}