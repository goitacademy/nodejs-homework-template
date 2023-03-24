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

user.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
};

user.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const getAllUsers = async () => {
  return Users.find();
};

const getUserById = async (id) => {
  return Users.findById(id);
};

const getUserByValue = async (data) => {
  const { property, value } = data;
  const response = await Users.findOne({ [property]: value });
  return response;
};

const createUser = async (body) => {
  return Users.create(body);
};

const updateUser = async (id, body) => {
  return Users.findOneAndUpdate(id, body);
};

const Users = mongoose.model("user", user);

module.exports = {
  Users,
  getAllUsers,
  getUserById,
  createUser,
  getUserByValue,
  updateUser,
};
