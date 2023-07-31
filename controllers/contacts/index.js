const {getContactList} = require('./getContactList');

const {getOneContact} = require('./getOneContact');
const {ctrlWrapper} = require("../../utils");

const {addNewContact} = require('./addNewContact');

const {deleteContact} = require('./deleteContact');

const {updateContactById} = require('./updateContactById');

const {updateStatusContact} = require ('./updateStatusContact');



module.exports = {
  getContactList: ctrlWrapper(getContactList),
  getOneContact: ctrlWrapper(getOneContact),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};