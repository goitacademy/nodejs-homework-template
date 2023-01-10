const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegexp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
// const emailRegexp = /^\[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

// схемa mongoose для пользователя
const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
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
    default: null,
  },  
}, { versionKey: false, timestamps: true })

// схема бросает ошибку с нужным статусом
userSchema.post("save", handleMongooseError);

// Joi схема на регистрацию 
const registerSchema = Joi.object({    
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().trim().min(6).required(), 
    subscription: Joi.string().required(),
});

// Joi схема на вход 
const loginSchema = Joi.object({    
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),    
});

// Joi схема на описание
const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
}

// создаём модель на основе mongoose схемы
const User = model('user', userSchema)


module.exports = { User, schemas };