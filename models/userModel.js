const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const userSubscriptionEnum = require("../constans/userSubscriptionEnum");

const userSchema = new mongoose.Schema(
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
    avatarUrl: {
      type: String,
      default: '',
    },
    subscription: {
      type: String,
      enum: Object.values(userSubscriptionEnum), // ["starter", "pro", "business"],
      default: userSubscriptionEnum.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// хешування паролю =>
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash('md5').update(this.email).digest('hex');

    this.avatarUrl = `https://www.gravatar.com/avatar/${emailHash}.jpg?r=pg&d=monsterid`
  };

  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.checkPassword = (candidate, hash) =>
  bcrypt.compare(candidate, hash);
// <====

const User = mongoose.model("User", userSchema);

module.exports = User;
