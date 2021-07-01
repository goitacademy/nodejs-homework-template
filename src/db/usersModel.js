const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const usersSchema = new Schema({
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
  avatarURL: String,
});

usersSchema.pre('save', async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
const UsersModel = mongoose.model('User', usersSchema);

module.exports = {
  UsersModel,
};
