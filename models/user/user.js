const { model } = require("mongoose");
const userSchema = require("./userSchema");

const User = model("user", userSchema);

module.exports = User;