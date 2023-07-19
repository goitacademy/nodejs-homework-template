const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // регуляйрний вираз для email
const subscriptionList = ["starter", "pro", "business"];

// Схема валідації mongoose (даних, які хочемо зберегти)
const userSchema = new Schema({
  password: {
    type: String,
    minlengh: 4,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: emailRegexp,
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscriptionList,
    default: subscriptionList[0],
  },
  token: String
}, { versionKey: false, timestamps: true }
    // versionKey: false - щоб не строрювалось поле "__v" з версією документа при додаванні данних
    // timestamps: true - щоб створювались поля createdAt і updatedAt (дата строрення і оновлення)
);

userSchema.post("save", handleMongooseError); // якщо валідація не пройде, то видасть помилку

// Схема валідації Joi для реєстрації (даних, що прийшли)
const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.valid(...subscriptionList),
});

// Схема валідації Joi для авторизації (даних, що прийшли)
const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

// Об'єднуємо схеми Joi8
const schemas = {
  registerSchema,
  loginSchema,
}

// Створюємо модель
const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
}