const { Schema, model } = require("mongoose");

const { handleMongooseError } = require('../helpers');

const Joi = require("joi");

const userSchema = new Schema ({
    name: {
        type: String,
        requared: true,
    },
    email: {
        type: String,
        unique: true,
        requared: [true, 'Email is required'],
    },
    password: {
        type: String,
        requared: [true, 'Set password for user'],
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
    token: {
        type: String,
        default: "" 
    }
}, { versionKey: false, timestamps: true});

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.valid("starter", "pro", "business").required().messages({
      "any.required": `missing field subscription`
    }),
  });

const schemas = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema
};

const User = model('user', userSchema);

module.exports = {
    User,
    schemas
}