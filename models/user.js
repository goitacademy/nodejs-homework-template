const { model } = require("mongoose");
const { mongooseUserShema } = require("../schema/users");

const User = model("user", mongooseUserShema);

module.exports = User;
