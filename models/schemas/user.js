const { Schema } = require('mongoose');

const bcrypt = require('bcryptjs');

const userShema = Schema(
  {
    password: {
      type: String,
      min: [6, 'Password should contain minimum 6 characters'],
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,7}$/, 'Provided email is invalid. Provide email in aaa@bbb.ccc format'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: {
        values: ['starter', 'pro', 'business'],
        message: `This subscription is not allowed. Allowed values: 'starter', 'pro', 'business'`,
      },
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

userShema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userShema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = userShema;
