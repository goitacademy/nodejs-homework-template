const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../helpers");

const Joi = require("joi");
 
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    password: {
        type: String,
        minlenght: 6,
        required: [true, 'Set password for user'],
      },
      email: {
        type: String,
        match: emailRegex,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: String,
      
}, {versionKey: false, timestamps: true});

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegex),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex),
    password: Joi.string().required(),
})

const schemas = {
    registerSchema,
    loginSchema,
};

const User = model('user', userSchema);

userSchema.post("save", handleMongooseError);

module.exports = {
    User,
    schemas,
};
