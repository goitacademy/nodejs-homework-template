const Contacts = require('../model/schemaContact')

const listContacts = (owner, { skip, limit, favorite }) => {
  console.log(favorite)
  if (favorite === undefined) {
    return Contacts.find({ owner }).select({ __v: 0 }).skip(skip).limit(limit)
  }
  return Contacts.find({ owner, favorite: favorite })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit)
}

const getContactById = (id, owner) => {
  return Contacts.findById({ _id: id, owner })
}

const removeContact = (id, owner) => {
  return Contacts.findByIdAndRemove({ _id: id, owner })
}

const addContact = ({ name, email, phone }, owner) => {
  return Contacts.create({ name, email, phone, owner })
}

const updateContact = (id, body, owner) => {
  return Contacts.findByIdAndUpdate({ _id: id, owner }, body, { new: true })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
