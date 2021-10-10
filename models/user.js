const { Schema, model } = require('mongoose');
const yup = require('yup');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = Schema(
  {
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
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const { SECRET_KEY } = process.env;

userSchema.methods.createToken = function () {
  const payload = {
    _id: this._id,
  };
  return jwt.sign(payload, SECRET_KEY);
};

const yupUserSchema = yup.object({
  email: yup.string().required('Обязательное поле'),
  password: yup.string().required('Обязательное поле'),
});

const User = model('user', userSchema);

module.exports = {
  User,
  yupUserSchema,
};
