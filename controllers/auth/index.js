const registration = require("./auth");
const login = require("./login");

const  ctrlWrapper  = require("../../utils/ctrlWrapper");


module.exports = {
  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login)
};
