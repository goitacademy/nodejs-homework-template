const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  token: String
});

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user, { abortEarly: false });
};

module.exports = {
  User: mongoose.model('User', userSchema),
  validateUser,
};