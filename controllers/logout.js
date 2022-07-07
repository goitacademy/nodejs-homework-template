const User = require("../models/user");
const createResponse = require("../helpers/createResponse");

async function logout(req, res) {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  createResponse(204, res);
}

module.exports = logout;
