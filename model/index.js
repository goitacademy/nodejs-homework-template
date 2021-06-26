const { Contacts } = require('../db/contacts.Models')
// const fs = require('fs').promises
// const path = require('path')
// const { v4: uuidv4 } = require('uuid')

// const contactsPath = path.join(__dirname, 'contacts.json')

async function listContacts (req, res) {
  const contacts = await Contacts.find({})

  return contacts
}

async function getContactById (contactId) {
  const contact = await Contacts.fingById(contactId)
  if (!contact) {
    return { message: 'Contact not found' }
  }
  return contact
}

async function removeContact (contactId) {
  await Contacts.findByIdAndRemove(contactId)
}

async function addContact (body) {
  try {
    const { name, email, phone } = body
    const contact = new Contacts({ name, email, phone })
    contact.save()
    return contact
  } catch (err) {
    console.log(err.message)
  }
}

const updateContact = async (contactId, body) => {
  const { favorite, name, email, phone } = body
  await Contacts.findByIdAndUpdate(contactId, { $set: { favorite, name, email, phone } })
  const contact = getContactById(contactId)
  return contact
}

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body
  await Contacts.findByIdAndUpdate(contactId, { $set: { favorite } })
  const newContact = await getContactById(contactId)
  return newContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
