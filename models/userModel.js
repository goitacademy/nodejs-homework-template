const mongoose = require("mongoose");
const userSubscriptionEnum = require("../constans/userSubscriptionEnum");
const bcrypt = require("bcrypt");

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
