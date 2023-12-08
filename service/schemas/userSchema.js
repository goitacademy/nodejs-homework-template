

const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const gravatar = require('gravatar');

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  avatarURL: {
    type: String,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  token: String,

  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: function () {
      return !this.verify; 
    }
  },
});
userSchema.pre('save', function (next) {

  if (!this.avatarURL) {
    this.avatarURL = gravatar.url(this.email, { s: '200', r: 'pg', d: 'mm' });
  }
  next();
});

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user, { abortEarly: false });
};

module.exports = {
  User: mongoose.model("User", userSchema),
  validateUser,
};
