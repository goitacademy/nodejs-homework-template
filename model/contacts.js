const Contacts = require('./Schemas/contact')


const listContacts = async (userId) => {
  const results = await Contacts.find({ owner: userId }).populate({
    path: 'owner',
    select: 'name email sex - id'
  })
  return results
}

const getContactById = async (id, userId) => {
  const result = await Contacts.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'name email sex - id'
  })
  return result
}
const addContact = async (body) => {
  const result = await Contacts.create(body)
  return result
}

const removeContact = async (id, userId) => {
  const result = await Contacts.findByIdAndRemove({ _id: id, owner: userId })
  return result
}

const updateContact = async (id, body, userId) => {
  const result = await Contacts.findByIdAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
