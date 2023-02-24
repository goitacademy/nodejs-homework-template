const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bCrypt = require('bcryptjs');
const SALT_FACTOR = process.env.SALT_FACTOR;

const usersSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const re =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return re.test(String(value).toLowerCase());
      },
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
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
usersSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bCrypt.genSalt(Number(SALT_FACTOR));
    this.password = await bCrypt.hash(this.password, salt);
  }
});

usersSchema.methods.validPassword = async function (password) {
  return bCrypt.compare(password, this.password);
};

const Users = model('user', usersSchema);
module.exports = Users;
