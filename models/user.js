const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const userSchema = Schema(
  {
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
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
    //  token: {
    //    type: String,
    //    default: null,
    //  },

    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiSignupSchema = Joi.object({
  password: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().min(6).required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiSignupSchema,
  joiLoginSchema,
};
