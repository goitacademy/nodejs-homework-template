const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { regexName, regexEmail } = require('../../helpers/regex');
const {
  USER_NAME_LIMIT,
  USER_EMAIL_LIMIT,
  USER_PASSWORD_LIMIT,
  USER_SUBSCRIPTION_TYPE,
} = require('../../helpers/constants');

const validateName = name => regexName.test(name);
const validateEmail = email => regexEmail.test(email);

const userMongooseSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: USER_NAME_LIMIT.MIN,
      maxlength: USER_NAME_LIMIT.MAX,
      required: [true, 'Name is required'],
      validate: [validateName, 'Please fill a valid name'],
      match: [regexName, 'Please fill a valid name'],
    },
    email: {
      type: String,
      index: true,
      trim: true,
      lowercase: true,
      minlength: USER_EMAIL_LIMIT.MIN,
      maxlength: USER_EMAIL_LIMIT.MAX,
      required: [true, 'Email is required'],
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [regexEmail, 'Please fill a valid email address'],
      unique: true,
    },
    password: {
      type: String,
      minlength: USER_PASSWORD_LIMIT.MIN,
      maxlength: USER_PASSWORD_LIMIT.MAX,
      required: [
        true,
        'Password is required and must be at least 6 characters long',
      ],
    },
    subscription: {
      type: String,
      enum: [
        USER_SUBSCRIPTION_TYPE.STARTER,
        USER_SUBSCRIPTION_TYPE.PRO,
        USER_SUBSCRIPTION_TYPE.BUSINESS,
      ],
      required: [false, "Subscription isn't required"],
      default: USER_SUBSCRIPTION_TYPE.STARTER,
    },
    avatarURL: {
      type: String,
      required: [true, 'Avatar is required'],
      default: null,
    },
    token: {
      type: String,
      required: [false, "Token isn't required"],
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

userMongooseSchema.methods.setHashPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userMongooseSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userMongooseSchema.methods.updateSubscription = function (newSubscription) {
  this.subscription = newSubscription;
};

userMongooseSchema.methods.setAvatar = function (avatarURL) {
  this.avatarURL = avatarURL;

  // TODO: rewrite to gravatar
};

userMongooseSchema.methods.updateAvatar = function (avatarURL) {
  this.avatarURL = avatarURL;
};

userMongooseSchema.methods.setToken = function () {
  const { SECRET_KEY } = process.env;
  this.token = jwt.sign({ id: this._id }, SECRET_KEY, { expiresIn: '1h' });
};

const User = model('user', userMongooseSchema);

module.exports = User;
