const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;
const { UserSubscription } = require('../../helper/constants');
const SALT_FACTOR = 6;
const bcrypt = require('bcryptjs');
const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      default: 'Guest',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLocaleLowerCase());
      },
    },
    subscription: {
      type: String,
      enum: {
        values: [UserSubscription.STARTER, UserSubscription.PRO, UserSubscription.BUSINESS],
        message: "It's not allowed",
      },
      default: UserSubscription.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },

  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(String(password), this.password);
};

const User = model('user', userSchema);

module.exports = User;
