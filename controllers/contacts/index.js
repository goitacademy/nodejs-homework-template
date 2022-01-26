const getContactsController = require("./getContactsController");
const getContactByIdController = require("./getContactByIdController");
const postContactController = require("./postContactController");
const deleteContactController = require("./deleteContactController");
const putContactController = require("./putContactController");
const updateFavoriteCtrl = require("./updateFavoriteCtrl");

module.exports = {
  getContactsController,
  getContactByIdController,
  postContactController,
  deleteContactController,
  putContactController,
  updateFavoriteCtrl,
};
