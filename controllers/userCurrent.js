const createResponse = require("../helpers/createResponse");

async function userCurrent(req, res) {
  const { email, subscription } = req.user;
  createResponse(200, res, { user: { email, subscription } });
}

module.exports = userCurrent;
