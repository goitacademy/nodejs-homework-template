const Contact = require('./schemas/contact')

// === ADD new contact ===
const addContact = async body => {
  return await Contact.create(body)
}

// === GET all contacts ===
const listContacts = async userId => {
  return await Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'email -_id',
  })
}

// === GET contact by ID ===
const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'email -_id',
  })
}

// === UPDATE contact ===
const updateContact = async (contactId, body, userId) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true },
  ).populate({
    path: 'owner',
    select: 'email -_id',
  })
}

// === REMOVE contact by ID ===
const removeContact = async (contactId, userId) => {
  return await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'email -_id',
  })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
