const getContactsList = require("./getContactsList");
const getContactByIdHandler = require("./getContactById");
const postContact = require("./postContact");
const deleteContact = require("./deleteContact");
const putContact = require("./putContact");
const changeFavorite = require("./changeFavorite");

module.exports = {
  getContactByIdHandler,
  getContactsList,
  postContact,
  deleteContact,
  putContact,
  changeFavorite,
};
