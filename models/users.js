const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = new Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        required: true,
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        required: true
    },
}, { versionKey: false, timestamps: true });

userSchema.methods.setPassword = function(password){
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const User = model('user', userSchema);

const registerJoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
});

const loginJoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
});

const updateSubscriptionJoiSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
})

module.exports = {
    User,
    registerJoiSchema,
    loginJoiSchema,
    updateSubscriptionJoiSchema
}