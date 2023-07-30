// user.js схема для auth user
const { model, Schema } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers/index');



// Любое регулярное выражение для проверки email
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Создали схему для отправки данных пользователя
const userSchema = new Schema(
  {
    email: {
      type: String,
      // Проверка email и уникальность добавить
      match: emailRegexp,
    //   mongoDB -> indexes -> email unique создать
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      // Минимальная длина 6 символов
      minlength: 6,
      required: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    // для logOut token строка, не обязательный параметр
    token: {
        type: String, 
        default: ""
    }
  },
  // Для добавления времени Event
  { versionKey: false, timestamps: true }
);

// Если не соответствует схеме - выкидываем ошибку
userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

// Создаём модель. Указываем название коллекции в единственном числе и схему добавляем userSchema
const User = model('user', userSchema);

module.exports = { schemas, User };
