const {Schema, model} = require('mongoose');
const Joi = require('joi');
const handleMongooseError = require('../helpers/handleMongooseError');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema ({
    // name:{ type: String,
    //        require: true,
    //      },
    password: { type: String,
                required: [true, 'Password is required'],
         },
    email: { type: String,
             required: [true, 'Email is required'],
             nunique: true,
             match: emailRegexp,
         },
    subscription: {
          type: String,
          enum: subscriptionList,
          default: "starter"
        },
    token: {
          type: String,
          default: null,
        },
    avatarURL:{
           type: String,
           require: true,
    }    
}, {versionKey:false, timestamps:true});

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
    // name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required(),
    subscription: Joi.string(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required(),
    subscription: Joi.string().valid(...subscriptionList),
})

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionList).required(),
})

const schema = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
}

const User = model('user', userSchema);

module.exports = {
    User,
    schema,
}