const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userRolesEnum = require('../constants/userRolesEnum');

const userSchema = mongoose.Schema(
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
    enum: Object.values(userRolesEnum),
    default: userRolesEnum.STARTER,
  },
  token: {
    type: String,
    default: null,
  },
},
  {
    timestamps: true,
    versionKey: false,
  }
)

// Pre save hook. Fires on Create and Save.
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  // hash passwd only when passwd changed
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Custom method
userSchema.methods.checkPassword = (candidate, hash) => bcrypt.compare(candidate, hash);

const User = mongoose.model('User', userSchema);

module.exports = User;