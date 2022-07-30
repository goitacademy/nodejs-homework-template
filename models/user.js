const Joi = require('joi');
const { Schema, model } = require('mongoose');

//const emailRegexp = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}';

const signupShema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().default("starter"),
  token: Joi.string().default(null)
})
//.pattern(new RegExp(emailRegexp))
const signinShema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
})
const shemas = {
    signup: signupShema,
    signin: signinShema
}

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        //match: emailRegexp,
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