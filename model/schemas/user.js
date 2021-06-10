const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Subscription } = require("../../helpers/constants");
const bcrypt = require("bcryptjs");
 const gravatar = require('gravatar');

const SALT_FACTOR = 6;

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
    validate(value) {
        const re = /\S+@\S+\.\S+/gi;
        return re.test(String(value).toLowerCase());
      },
  },
  subscription: {
    type: String,
    enum: [Subscription.STARTER, Subscription.BUSINESS, Subscription.PRO],
    default: Subscription.STARTER
  },
  token: {
    type: String,
    default: null,
    },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: 250 }, true);
      },
    },
},
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});


userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(String(password), this.password);
};


const User = mongoose.model("user", userSchema);

module.exports = User;