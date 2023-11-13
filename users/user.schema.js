const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const user = new Schema (
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
        avatarURL: {
          type: String,
          default: null,
        },
        verify: {
          type: Boolean,
          default: false,
        },
        verificationToken: {
          type: String,
          default: null,
          required: [true, 'Verify token is required'],
        },
      }
);

user.pre('save', async function() {
  if(!this.password) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  this.password = await bcrypt.hash(this.password, salt);
});

user.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", user);

module.exports = User;