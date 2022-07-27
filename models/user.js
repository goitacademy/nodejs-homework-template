const {Schema, model} = require ("mongoose");
const Joi = require("joi");

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userSchema = Schema ({
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    // subscription: {
    //   type: String,
    //   enum: ["starter", "pro", "business"],
    //   default: "starter"
    // },
    // token: {
    //   type: String,
    //   default: null,
    // },
}, {versionKey:false, timestamps: true});

const registerSchema = Joi.object({
    password:Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    
}) 
  
const loginSchema = Joi.object({
    password:Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
})
  
const schemas = {
    signup: registerSchema,
    login: loginSchema,
}
const User = model("user",userSchema);

module.exports = {
    User,
    schemas,
};