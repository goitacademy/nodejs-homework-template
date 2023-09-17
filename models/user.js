const { model, Schema } = require('mongoose');
const handleMongooseErr = require('../helpers/handleMongooseErr');
const Joi = require('joi');

const suscriptions = ["starter", "pro", "business"]

const usersSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Set password for user'],
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
            default: ""
        },
        avatarURL: {
            type: String,
            required: true
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
        },
    },
    {
        versionKey: false, timestamps: true
    }
);

usersSchema.post("save", handleMongooseErr);
const User = model('user', usersSchema);

const registrationSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string(),

});

const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),


});
const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...suscriptions),
})

const schemas = { registrationSchema, loginSchema, subscriptionSchema }

module.exports = { User, schemas };