const { model } = require("mongoose");

const { mongooseUserSchema } = require("../validation/users");

const User = model("user", mongooseUserSchema);

module.exports = User;