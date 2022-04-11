const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { Role } = require("./constant");
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
  name: {
    type: String,
    default: "Guest",
  },
  email: {
    type: String,
    required: [true, "Set email for user"],
    unique: true,
    validate(value) {
      const re = /\S+@\S+\.\S+/;
      return re.test(String(value).toLowerCase());
    },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: { values: Object.values(Role), message: "Invalid role" },
    default: Role.USER,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(6);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.invalidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
