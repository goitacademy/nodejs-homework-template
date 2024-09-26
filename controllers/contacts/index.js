const {getContactList} = require('./getContactList');

const {getOneContact} = require('./getOneContact');

const {addNewContact} = require('./addNewContact');

const {deleteContact} = require('./deleteContact');

const {updateContactById} = require('./updateContactById');

const {updateStatusContact} = require ('./updateStatusContact');



module.exports = {
  getContactList,
  getOneContact,
  addNewContact,
  deleteContact,
  updateContactById,
  updateStatusContact,
};