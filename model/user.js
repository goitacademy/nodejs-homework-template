const { model } = require("mongoose");
const { userSchema } = require("../schemas/user");

const User = model("user", userSchema);

module.exports = User;
