const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto')

const userRolesEnum = require('../constants/userRolesEnum');

const userSchema = new mongoose.Schema(
  {
  password: {
    type: String,
      required: [true, 'Password is required'],
    select: false,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Duplicated email...'],
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'bussines'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
    },
    avatarURL: {
      type: String
    },
},
  {
    timestamps: true,
    versionKey: false,
  }
)

// Pre save hook. Fires on Create and Save.
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash('md5').update(this.email).digest('hex');
    this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=robohash`;
  }

  if (!this.isModified('password')) return next();

  // hash passwd only when passwd changed
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Custom method
userSchema.methods.checkPassword = (candidate, hash) => bcrypt.compare(candidate, hash);

const User = mongoose.model('User', userSchema);

module.exports = {User};