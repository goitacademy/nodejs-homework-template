const { Schema, model } = require('mongoose');
const { Subscription } = require('../helpers/constants');
const subscriptionOptions = Object.values(Subscription);

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionOptions,
      default: Subscription.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  },
);

const User = model('user', userSchema);

module.exports = User;
