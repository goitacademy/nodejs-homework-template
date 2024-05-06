const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
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
    default: function () {
      const hash = crypto.createHash("md5").update(this.email).digest("hex");
      return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
    },
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

userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  if (!this.avatarURL) {
    const hash = crypto.createHash('md5').update(this.email).digest('hex');
    this.avatarURL = `https://www.gravatar.com/avatar/${hash}?d=identicon`;
  }
  if (this.isNew) {
    this.verificationToken = crypto.randomBytes(16).toString('hex'); // Generuje token weryfikacyjny
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
