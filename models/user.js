const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi'); 

const userSchema = Schema ({
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
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

const joiUserSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string(),
})

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const User = model('user', userSchema);

module.exports = {
    User,
    joiUserSchema,
    joiSubscriptionSchema,
}