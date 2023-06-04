const { Schema, model } = require("mongoose");

const { handleMongooseError } = require('../helpers');

const Joi = require("joi");

const userSchema = new Schema ({
    
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
    avatarUrl: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: "" 
    }
}, { versionKey: false, timestamps: true});

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required().messages({
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
