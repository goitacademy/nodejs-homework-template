const listController = require("./lisContacts");
const getByIdController = require("./getById");
const addController = require("./addContact");
const removeController = require("./removeContact");
const updateControllers = require("./updateContact");
module.exports = {
  listController,
  getByIdController,
  addController,
  removeController,
  updateControllers,
};
