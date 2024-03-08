const {Schema, model} = require("mongoose");

const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Set password for user'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: emailFormat,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
        default: ""
      },
      avatarURL: {
        type:  String,
        required: true,
      },
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
      },
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailFormat).required(),
    password: Joi.string().min(6).required(),
    subscription:Joi.string(),
});

const verifySchema = Joi.object({
  email: Joi.string().pattern(emailFormat).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailFormat).required(),
    password: Joi.string().min(6).required(),
});

const schemas ={
    registerSchema,
    loginSchema,
    verifySchema
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}

