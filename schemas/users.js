const mongoose = require('mongoose');
const { Schema } = mongoose;

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
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
  },
  {
    versionKey: false,
    // timestamps: true
  }
);

const User = mongoose.model('user', userSchema);

module.exports = User;