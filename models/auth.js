const mongoose = require("mongoose");
const authSchema = require("../schemas/authSchema");

const Auth = mongoose.model("auth", authSchema);

module.exports = Auth;
