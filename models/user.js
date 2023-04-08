const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const user = new Schema({
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
});

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const User = mongoose.model("users", user);

const registerContact = async (email, password) => {
  const hashedPassword = hashPassword(password);

  const user = new User({ email, password: hashedPassword });
  user.save();
  return user;
};

const listContact = async () => {
  const users = await User.find();
  return users;
};

const checkEmail = async (email) => {
  const users = await User.findOne(email);
  return users;
};

module.exports = {
  registerContact,
  listContact,
  checkEmail,
  hashPassword,
};
