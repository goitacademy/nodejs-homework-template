const { Schema, model } = require('mongoose')
const Joi = require("joi");
const userSchema = new Schema(
      {
    name: {
        type: String,
        unique:true,
      required: true,
    },
    email: { 
        type: String,
          unique:true,
         required: true,
    },
    password: {
        type: String,
        required: true,
        unique:true,
         minlegth:6
     
        },
  
    },
    { versionKey: false, timestamps: true },
   

)


const registerSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
});


const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
}); 
const schemas  = {
    registerSchema,
    loginSchema
}

const User = model('user', userSchema)

module.exports = {
    schemas,
    User
}