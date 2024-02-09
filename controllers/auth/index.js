const registration = require("./registration");
const login = require("./login");
const { regControllerWrapper } = require("./regControllerWrapper");

module.exports = {
  registration: regControllerWrapper(registration),
  login: regControllerWrapper(login),
};
