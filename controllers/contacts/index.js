const {getContactList} = require('./getContactList');

const {getOneContact} = require('./getOneContact');

const {addNewContact} = require('./addNewContact');

const {deleteContact} = require('./deleteContact');

const {updateContactById} = require('./updateContactById');

const {updateStatusContact} = require ('./updateStatusContact');

const {ctrlWrapper} = require("../../utils");

module.exports = {
  getContactList: ctrlWrapper(getContactList),
  getOneContact: ctrlWrapper(getOneContact),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};