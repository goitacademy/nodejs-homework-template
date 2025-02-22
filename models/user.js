const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
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
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250', d: 'retro' }, true);
    },
  },
});

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   this.token = token;
//   return token;
// };

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  if (this.isNew) {
    this.avatarURL = gravatar.url(this.email, { s: '250', d: 'retro' }, true);
  }

  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;