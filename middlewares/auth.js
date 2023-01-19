const { User } = require("../models/index");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const SECRET_KEY = `${process.env.SECRET_KEY}`;

const auth = async (req, res) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw Unauthorized("Not authorized");
  }
};

module.exports = auth;
