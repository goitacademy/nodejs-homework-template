const { Contact } = require('../schemas/contacts')

const getAllContacts = async () => {
  const contacts = await Contact.find()
  console.log(contacts)
  return contacts
}
const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId)
  return contact
}

const addContact = async ({ name, email, phone, favorite }) => {
  const newContact = await Contact.create({ name, email, phone, favorite })
  return newContact
}

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  })
  return updatedContact
}

const updateStatusContact = async (contactId, { favorite }) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  )
  return updatedContact
}

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove(contactId)
  return contact
}

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
