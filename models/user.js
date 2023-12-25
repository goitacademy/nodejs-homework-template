const {Schema, model} = require('mongoose');

const {handleMongooseError} = require('../helpers')

const Joi = require('joi')

const userScheme = new Schema({
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
      token: String,
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      avatarURL: {
        type: String,
        required: true,
      },
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
      },
}, {versionKey: false, timestamps: true});

userScheme.post('save', handleMongooseError);

const registerSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string(),
})

const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
})

const emailSchema = Joi.object({
  email: Joi.string().required(),
})

const updateSubscription = Joi.object({
  subscription: Joi.string().required(),
})

const schemas = {
    registerSchema,
    loginSchema,
    updateSubscription,
    emailSchema,
}

const User = model('user', userScheme);

module.exports = {
    User,
    schemas,
  }