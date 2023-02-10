const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contacts = new Schema(
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
  {
    versionKey: false,
    timestamps: true,
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  }
);

const Contacts = mongoose.model('contacts', contacts);

module.exports = Contacts;
