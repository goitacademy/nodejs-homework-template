const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers')

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
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(6).required(),    
});

// Joi схема на вход 
const loginSchema = Joi.object({    
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),    
});

const schemas = {
    registerSchema,
    loginSchema,
}

// создаём модель на основе mongoose схемы
const User = model('user', userSchema)


module.exports = { User, schemas };