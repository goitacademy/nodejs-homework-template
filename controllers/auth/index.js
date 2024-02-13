const registration = require("./registration");
const login = require("./login");
// const logout = require("./logout");

const { regControllerWrapper } = require("./regControllerWrapper");

module.exports = {
  registration: regControllerWrapper(registration),
  login: regControllerWrapper(login),
  // logout: regControllerWrapper(logout),
};
