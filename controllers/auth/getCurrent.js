const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;


const getCurrent = (req, res) => { 
 const { name, email } = req.user;
  res.json({
    name,
    email,
  });
}

module.exports = getCurrent