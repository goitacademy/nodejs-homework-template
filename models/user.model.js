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
    default: "https://www.gravatar.com/avatar/?d=identicon"
  },
});

userSchema.methods.isValidPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function(next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  if (this.isModified("email") || this.isNew) {
    const hash = crypto.createHash('md5').update(this.email).digest('hex');
    this.avatarURL = `https://www.gravatar.com/avatar/${hash}?d=identicon`;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
