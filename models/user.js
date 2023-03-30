const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for user'],
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
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
    token: { type: String, default: null },
    avatarURL: {
      type: String,
      // required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// Pre save hook // create save
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash('md5').update(this.email).digest('hex');
    this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=identicon`;
  }

  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Custom method
userSchema.methods.checkPassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = model('user', userSchema);

module.exports = User;
