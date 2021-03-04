const Contact = require('./contactsSchema')

const listContacts = async (userId) => {
  const contacts = await Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'name email -_id'
  })
  return contacts
}

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'name email -_id'
  })
  return contact
}

const addContact = async (body) => {
  const contact = await Contact.create(body)
  return contact
}

const updateContact = async (contactId, body, userId) => {
  const contact = await Contact.findByIdAndUpdate({ _id: contactId, owner: userId }, { ...body }, { new: true }).populate({
    path: 'owner',
    select: 'name email -_id'
  })
  return contact
}

const removeContact = async (contactId, userId) => {
  const deletedContact = await Contact.findByIdAndDelete({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'name email -_id'
  })
  return deletedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
