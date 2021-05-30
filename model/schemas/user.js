// const { func } = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;
const { Subscription } = require("../../helpers/constants");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate(value) {
      const re = /\S+@\S+\.\S+/gi;
      return re.test(String(value).toLowerCase());
    },
  },
  subscription: {
    type: String,
    enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
    default: Subscription.STARTER,
  },
  token: {
    type: String,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(String(password), this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
