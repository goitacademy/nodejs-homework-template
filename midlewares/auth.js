const { User } = require("../models/users");
const { Unauthorized } = require("http-errors");

const auth = async (req, res) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw new Unauthorized("Not authorized");
  }
};

module.exports = auth;
