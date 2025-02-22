const { ctrlWrapper } = require("../../helpers");

const getAll = require("./getAllContacts");
const getById = require("./getByIdContact");
const postContact = require("./postContact");
const deleteContact = require("./deleteContact");
const putContact = require("./putContact");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  postContact: ctrlWrapper(postContact),
  deleteContact: ctrlWrapper(deleteContact),
  putContact: ctrlWrapper(putContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
