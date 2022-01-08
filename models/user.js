const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: emailRegexp,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    }
},
    {
        versionKay: false,
        timestamp: true
    }
);

const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required()
});

const User = model("user", userSchema);

module.exports = {
    User,
    joiSchema
}