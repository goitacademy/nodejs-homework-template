// const jwt = require('jsonwebtoken');
const { Schema, model } = require('mongoose');
// const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const passwordRegex = '';
// const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema ({
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      // match: emailRegex
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: 4
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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      // required: true
    },
    avatarURL: {
      type: String
    },
    verify:{
      type: Boolean,
      default: false
    },
    // verified_at:{
    //   type: String
    // },
    // verificationCode: {
    //   type: String,
    //   default: ""
    // },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
},{
  versionKey: false,
  // timestamps: true
});

userSchema.post("save", handleMongooseError);

const User = model('user', userSchema);

module.exports = {
    User
}