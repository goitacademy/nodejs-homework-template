const { model } = require("mongoose");
const { userSchemas } = require("../schemas");

const User = model("user", userSchemas.userSchema);

module.exports = User;
