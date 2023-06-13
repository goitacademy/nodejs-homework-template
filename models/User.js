const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
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
  avatarUrl: {
    type: String,
    required: true,
  },
  token: String,
});

schema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("user", schema);

module.exports = { User };
