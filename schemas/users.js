const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("B4c0/\/", salt);

const users = new Schema (
    {
        password: {
          type: String,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },

        token: String
      }
      
);

users.methods.setPassword = function (password) {
  console.log('salting')
    this.password = bcrypt.hashSync(password, salt);
}

users.methods.validPassword = function (password) {
  console.log('validation')
  return bcrypt.compareSync(password, this.password);
}

users.methods.setToken = function (token) {
  console.log('set token', token)
  this.token = token;
}

users.methods.deleteToken = function () {
  console.log('delete token')
  this.token = null;
}

const Users = mongoose.model("users" , users);
module.exports = Users;