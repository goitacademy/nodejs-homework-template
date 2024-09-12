const {ctrlWrapper} = require('../../helpers')

const addNewContact = require('./addNewContact')
const deleteContactById = require('./deleteContactById')
const getAllContacts = require('./getAllContacts')
const getContactById = require('./getContactById')
const updateContactById = require('./updateContactById')
const updateFavorite = require('./updateFavorite')

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavorite: ctrlWrapper(updateFavorite),
}