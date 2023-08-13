const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const handleMongooseError = require('../helpers/hendleMongooseError');
const { timeStamp } = require('console');

const emailRegexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

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
      required: true,
    },
    {
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
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
  versionKey: false,
    timeStamp: true, }
);


//pre save mongoose hook. Fires on create & save
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash('md5').update(this.email).digest('hex');
  }

  if (!this.isModified('password'))
    return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});


userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const validSubscriptionValues = ["starter", "pro", "business"];
const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...validSubscriptionValues)
    .required(),
});

const schema = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;

}


const User = model("user", userSchema);

module.exports = { User, schema };