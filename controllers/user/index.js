const addContact = require("./addContact");
const getContact = require("./getContact");
const getInfo = require("./getInfo");
const currentUser = require("./currentUser");
const logout = require("./logout");

const {
  regControllerWrapper,
} = require("../../controllers/auth/regControllerWrapper");

module.exports = {
  addContact: regControllerWrapper(addContact),
  getContact: regControllerWrapper(getContact),
  getInfo: regControllerWrapper(getInfo),
  currentUser: regControllerWrapper(currentUser),
  logout: regControllerWrapper(logout),
};
