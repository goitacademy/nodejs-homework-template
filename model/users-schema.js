const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const { Subscription } = require('../helpers/constants');

const subscriptionOptions = Object.values(Subscription);

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true
    },
    subscription: {
      type: String,
      enum: subscriptionOptions,
      default: Subscription.STARTER
    },
    token: {
      type: String,
      default: null
    }
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      }
    }
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;
