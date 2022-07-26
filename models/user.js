const{Schema, model}=require('mongoose');
const Joi=require('joi');

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userSchema=Schema({
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    email:{
        type:String,
        match:emailRegexp,
        required:[true, 'Email is required'], 
        unique:true
    },
    
    subscription:{
        type:String,
        enum:['starter', 'pro', 'business'],
        default:'starter'
    },
    token:{
        type:String,
        default:null
    }
},{versionKey:false, timestamp:true} )

const signupSchema=Joi.object({
    email:Joi.string().pattern(emailRegexp).required(),
    password:Joi.string().required()
})

const loginSchema=Joi.object({
    email:Joi.string().pattern(emailRegexp).required(),
    password:Joi.string().required()   
})

const User=model('user', userSchema);

const schemas={
    register:signupSchema,
    login:loginSchema
}

module.exports={
    User,
    schemas
}