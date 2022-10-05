const { Schema, model } = require('mongoose');
/** liba for data typing */
const Joi = require('joi');

const { handleSaveError } = require('../helpers');

/** Schema db  */
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
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

// this foo it is medelware for validate
// const handleSaveError = (error, data, next) => {
//   const { name, code } = error;
//   error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
//   // console.log(error);
//   // console.log(data);
//   next();
// };
userSchema.post('seve', handleSaveError);

/** like type script typing data */
const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const Schemas = {
  registerSchema,
  loginSchema,
};
/** our model */
const User = model('user', userSchema);

module.exports = {
  User,
  Schemas,
};
