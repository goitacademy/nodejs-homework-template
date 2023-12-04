const { controllerWraper } = require("../../helpers");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const getAll = require("./getAll");
const getById = require("./getById");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getAll: controllerWraper(getAll),
  getById: controllerWraper(getById),
  addContact: controllerWraper(addContact),
  updateContact: controllerWraper(updateContact),
  updateStatusContact: controllerWraper(updateStatusContact),
  deleteContact: controllerWraper(deleteContact),
};
