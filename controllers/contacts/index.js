const { addNewContact } = require("./addNewContact");
const { deleteContact } = require("./deleteContact");
const { getAll } = require("./getAll");
const { getById } = require("./getById");
const { ubdateById } = require("./ubdateById");
const { updateStatusContact } = require("./updateStatusContact");

module.exports = {
  updateStatusContact,
  ubdateById,
  getById,
  getAll,
  deleteContact,
  addNewContact,
};