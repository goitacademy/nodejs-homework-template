const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bCrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamp: true }
);

userSchema.methods.setPassword = function (password) {
	this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
	return bCrypt.compareSync(password, this.password);
};

userSchema.methods.setToken = function (token) {
	this.token = token;
};

const User = model('User', userSchema, 'users');

module.exports = User;
