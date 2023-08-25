const { Schema, model } = require('mongoose');
// const bcrypt = require('bcrypt');

const { userRolesEnum } = require('../constants');

const { handleMongooseError } = require('../utils');

// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;s

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },

    email: {
      type: String,
      // match: emailRegexp,
      required: [true, 'Email is required'],
      // unique: true,
      unique: [true, 'Duplicated email'],
    },

    subscription: {
      type: String,
      // enum: ['starter', 'pro', 'business'],
      enum: Object.values(userRolesEnum),
      // default: 'starter',
      default: userRolesEnum.STARTER,
    },

    accessToken: String,
    refreshToken: String,

    avatarURL: String,

    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.post('save', handleMongooseError);
// userSchema.pre('save', async (next) => {
//   if (!this.isModified('password')) return next(); // password not modified

//   const salt = await bcrypt.genSalt(10); // рівень складності хешування
//   this.password = await bcrypt.hash(this.password, salt);

//   next();
// });

const UserModel = model('User', userSchema);

module.exports = UserModel;
