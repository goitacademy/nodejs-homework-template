const { ctrlWrap } = require("../../helpers");

const getContacts = require('./getContacts');

const getContact = require('./getContact');

const createContact = require('./createContact');

const deleteContact = require('./deleteContact');

const updateContact = require('./updateContact.js');

const updateStatusContact = require('./updateStatusContact.js');;

module.exports = {
  getContacts: ctrlWrap(getContacts),
  getContact: ctrlWrap(getContact),
  createContact: ctrlWrap(createContact),
  deleteContact: ctrlWrap(deleteContact),
  updateContact: ctrlWrap(updateContact),
  updateStatusContact: ctrlWrap(updateStatusContact),
};
