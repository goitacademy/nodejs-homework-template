const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlenght: 6,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },

}, { versionKey: false, timestamps: true });
// метод для чеширования пароля
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
//  метод ля сравнения пароля который ввел пользователь с сохраненным захешированным паролем в базе
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
};

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),

});

const User = model('user', userSchema);

module.exports = {
  User,
  joiSchema,
}
