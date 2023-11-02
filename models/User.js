const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');
const {
  emailRegexp,
  subscriptionEnums,
} = require('../constants/schemaCommons');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      minLenth: 6,
      required: [true, 'Set password for user'],
    },
    token: {
      type: String,
      default: '',
    },
    subscription: {
      type: String,
      enum: subscriptionEnums,
      default: 'starter',
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

module.exports = model('user', userSchema);
