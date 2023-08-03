const { model } = require("mongoose");
const { userSchema } = require("../helpers");

const User = model("user", userSchema);

module.exports = User;