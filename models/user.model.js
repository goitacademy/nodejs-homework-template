const mongoose = require("mongoose");
const gravatar = require("gravatar");

const userSchema = new mongoose.Schema({
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
  avatarURL: String,
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});
userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

userSchema.pre("save", function (next) {
  if (!this.avatarURL) {
    const avatar = gravatar.url(this.email, { s: "200", d: "retro" });
    this.avatarURL = avatar;
  }
  next();
});
const User = new mongoose.model("User", userSchema);

module.exports = User;
