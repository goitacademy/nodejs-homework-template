const ContactModel = require('./shemas/contact')

const listContacts = async () => {
  const contacts = await ContactModel.find()

  return contacts
}

const getContactById = async contactId => {
  const contact = await ContactModel.findById(contactId)

  return contact
}

const removeContact = async contactId => {
  const contact = await ContactModel.findByIdAndDelete(contactId)

  return contact
}

const addContact = async body => {
  const contact = await ContactModel.create({ ...body })

  return contact
}

const updateContact = async (contactId, body) => {
  const contact = await ContactModel.findByIdAndUpdate(contactId, body, {
    new: true
  })

  return contact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
