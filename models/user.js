const { model } = require("mongoose");

// const { userSchema } = require("./schemas");
const { user } = require("./schemas");
const { userSchema } = user;

const User = model("user", userSchema);

module.exports = User;
