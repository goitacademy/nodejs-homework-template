const addContact = require("./addContact");
const getContact = require("./getContact");
const getInfo = require("./getInfo");

const {
  regControllerWrapper,
} = require("../../controllers/auth/regControllerWrapper");

module.exports = {
  addContact: regControllerWrapper(addContact),
  getContact: regControllerWrapper(getContact),
  getInfo: regControllerWrapper(getInfo),
};
