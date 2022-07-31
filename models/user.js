const Joi = require('joi');
const { Schema, model } = require('mongoose');

const signupShema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().valueOf('starter', 'pro', 'business').default("starter"),
  token: Joi.string().default(null)
})

const signinShema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
})

const updateSubscriptionShema = Joi.object({
    subscription: Joi.string().valueOf('starter', 'pro', 'business').required(),
});

const shemas = {
    signup: signupShema,
    signin: signinShema,
    updateSub: updateSubscriptionShema,
}

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
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
}, { versionKey: false, timestamps: true })

const User = model('user', userSchema);

module.exports = {
    User,
    shemas
}