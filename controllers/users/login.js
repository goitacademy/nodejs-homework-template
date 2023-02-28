const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const { User } = require("../../models");

const login = async (req, res) => {
  const { email, password } = req.body;
};

module.exports = login;
