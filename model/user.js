const { model } = require("mongoose");
const  userSchema  = require("./schema/user")
const User = model("user", userSchema)
module.exports = User;