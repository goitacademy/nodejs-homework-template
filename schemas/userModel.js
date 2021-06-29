const mongoose = require('mongoose');
const { Subscription } = require('../helpers/constants');
const { Schema, SchemaTypes } = mongoose;
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 6;



const userSchema = new Schema(
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
      enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
      default: Subscription.STARTER,
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
  { versionKey: false }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(SALT_FACTOR))
  }
  return next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
};

const User = mongoose.model('user', userSchema);

module.exports = { User };
