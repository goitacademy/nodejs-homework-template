const Contact = require('./schemas/schContact')

const listContacts = async (userId) => {
  return await Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'email subscription -_id',
  })
}

const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'email subscription -_id',
  })
}

const removeContact = async (contactId, userId) => {
  return await Contact.findByIdAndRemove({ _id: contactId, owner: userId })
}

const addContact = async (bodyAndOwner) => {
  const result = await Contact.create(bodyAndOwner)
  return result._doc
}

const updateContact = async (contactId, bodyAndOwner) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...bodyAndOwner },
    { new: true }
  )
  return { updated: updatedContact, updateStatus: true }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
