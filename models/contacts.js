const animalRepository = require('./contacts.json')
const readJsonFiles = require('../untils/readJsonFiles')
const path = require('path')
const { nanoid } = require('nanoid')
const ERROR_TYPES = require('../constants/errorTypes')
const createError = require('../untils/createError')
// const fs = require('fs/promises')
const CONTACTS_PATH  = path.join(__dirname,'./contacts.json')
const listContacts = async () => {
  const contactsList = await readJsonFiles(CONTACTS_PATH)
  return contactsList
}

const getContactById = async (contactId) => {
  const contactsList = await listContacts()
  const contact = contactsList.find((contact) => contact.id === contactId);
  if(!contact){
    const error = createError(ERROR_TYPES.NOT_FOUND,{
      message: `Not found`,
      data: {},
    })
    throw error
  }
  return contact
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {

}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
