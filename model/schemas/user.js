const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { Subscriptions } = require('../../helpers/constants');

const SALT_WORK_FACTOR = 8;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const regEx = /\S+@\S+\.\S+/;
        return regEx.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true);
      },
    },
    subscription: {
      type: String,
      enum: [Subscriptions.FREE, Subscriptions.PRO, Subscriptions.PREMIUM],
      default: Subscriptions.FREE,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

// при сохранении в базу проверяется модифицирован ли пароль, что бы не солить его повторно
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSaltSync(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt, null);
  next();
});

userSchema.methods.validPassword = async function (password) {
  // биб-ка bcrypt сама расшифрует наш пароль с базы и сравнит его с тем, что вводится
  return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;
