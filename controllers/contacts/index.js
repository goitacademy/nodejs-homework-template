const getAll = require("./getAll");
const getById = require("./getById");
const addContact = require("./add");
const deleteContact = require("./delete");
const updateContact = require("./update");
const updateStatusContact = require("./updateStatus");

module.exports = {
  getAll,
  getById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
