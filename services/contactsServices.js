const Contact = require('../schemas/contactsSchema')

const getListContacts = async () => {
  const listContacts = await Contact.find()
  return listContacts
}

const getContactById = async (id) => {
  const contact = await Contact.findById({ _id: id })
  return contact
}

const addContact = async ({ name, email, phone, favorite }) => {
  const contactNew =
        await Contact.create({ name, email, phone, favorite })
  return contactNew
}

const removeContact = async (id) => {
  const contactRemoved =
        await Contact.findByIdAndRemove({ _id: id })
  return contactRemoved
}

const updateContact = async (id, body) => {
  const contactUpdated =
        await Contact.findByIdAndUpdate({ _id: id }, body, { new: true })
  return contactUpdated
}

const updateStatusContact = async (id, { favorite }) => {
  const statusUpdated =
        await Contact.findByIdAndUpdate({ _id: id }, { favorite }, { new: true })
  return statusUpdated
}

module.exports = {
  getListContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
}
