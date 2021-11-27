const listContacts = require('./listContacts')
const getByIdContact = require('./getByIdContact')
const addContact = require('./addContact')
const removeContact = require('./removeContact')
const updateContact = require('./updateContact')
const changeFavorite = require('./changeFavorite')
const updateImage = require('./updateImage')

module.exports = {
  listContacts,
  getByIdContact,
  addContact,
  removeContact,
  updateContact,
  changeFavorite,
  updateImage,
}
