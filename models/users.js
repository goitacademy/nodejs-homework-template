const {Schema, model} = require('mongoose');
const {handleMongooseError} = require('../helpers');
const Joi = require("joi");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema ({
   
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token : {
        type : String,
        default : null
    }

}, {versionKey:false, timestamps:true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({    
    email : Joi.string().pattern(emailRegexp).required(),
    password : Joi.string().min(6).required(),
});

const loginSchema = Joi.object({  
    email : Joi.string().pattern(emailRegexp).required(),
    password : Joi.string().min(6).required(),
});

const schemas = {
    registerSchema,
    loginSchema 
  }

const User = model('user', userSchema);

module.exports={
    User,
    schemas
}