const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers/index");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set password for user'],
    },
    password: {
        type: String,
        minlength:6,
        required: true,
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
        default : "", 
    }                                          // pr
},
{ versionKey: false, timestamps: false });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
        .required()
    ,
    password: Joi
        .string()
        .min(6)
        .required()
    ,
});

const loginSchema = Joi.object({
    email: Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
        .required()
    ,
    password: Joi
        .string()
        .min(6)
        .required()
    ,
});

const schemas = {
    registerSchema,
    loginSchema,
};

const User = model("user", userSchema);


module.exports = {
    User,
    schemas,
};