const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');
const { regexpList, subscriptionList } = require('../variables');

/**
 * Schema for the User model.
 */
const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: [6, 'Password min length 6 characters'],
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: [regexpList.email, 'Email must be valid'],
      required: [true, 'Email is required'],
      unique: [true, 'Email in use'],
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: subscriptionList[0],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

// Handle Mongoose save errors using a post middleware
userSchema.post('save', handleMongooseError);

/**
 * Mongoose model for the 'user' collection using the userSchema.
 */
const User = model('user', userSchema);

module.exports = User;

// This code defines a Mongoose schema for the User model, specifying the schema fields, data types, and validation rules. It also includes a post middleware to handle Mongoose save errors using the handleMongooseError function from the helpers module.

// The User model is created using the model function, and it is exported for use in other parts of your application. This model represents the "user" collection in your MongoDB database and can be used to interact with user data.
