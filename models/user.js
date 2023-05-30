const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
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
    // subscription: {
    //     type: String,
    //     enum: ["starter", "pro", "business"],
    //     default: "starter"
    // },
    // token: String
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email(emailRegexp).required(),
    password: Joi.string().min(6).required()
});

const schemasUser = {
    registerSchema,
    loginSchema
};

const User = model("user", userSchema);

module.exports = {
    schemasUser,
    User
}