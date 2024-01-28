const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar'); // Убедитесь, что gravatar установлен и импортирован

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: String,
  avatarURL: String, // Добавление нового поля здесь
});

// Методы и хуки схемы
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.token = token;
  await user.save();
  return token;
};

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  // Генерация URL аватара Gravatar, если avatarURL не задан
  if (!user.avatarURL) {
    user.avatarURL = gravatar.url(this.email, { s: '250', d: 'retro' }, true);
  }

  next();
});

// Создание модели
const User = mongoose.model('User', userSchema);

module.exports = User;
