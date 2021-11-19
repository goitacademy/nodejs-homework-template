const getContactsList = require("./handlers/getContactsList");
const getContactByIdHandler = require("./handlers/getContactById");
const postContact = require("./handlers/postContact");
const deleteContact = require("./handlers/deleteContact");
const putContact = require("./handlers/putContact");

module.exports = {
  getContactByIdHandler,
  getContactsList,
  postContact,
  deleteContact,
  putContact,
};
