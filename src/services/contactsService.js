const { Contacts } = require('../db/contactsModel')
const {
  WrongParametersError
} = require('../helpers/errors')

const getContacts = async () => {
  const contacts = await Contacts.find({})
  return contacts
}

const getContactById = async (id) => {
  const contact = await Contacts.findById(id)
  if (!contact) {
    throw new WrongParametersError('No contact with this id')
  }
  return contact
}
  
const postContact = async ({ name, email, phone }) => {
  const newContact = new Contacts({ name, email, phone })
  await newContact.save()
  return newContact
}
  
const deleteContact = async (id) => {
  const contactToRemove = await Contacts.findByIdAndRemove(id)
  if (!contactToRemove) {
    throw new WrongParametersError('No contact with this id')
  }
}
  
const patchContact = async ({ id, name, email, phone, favorite }) => {
  const contactToChange = await Contacts.findById(id)
  if(!contactToChange) {
    throw new WrongParametersError('No contact with this id')
  }
  const newContact = await Contacts.findByIdAndUpdate(id, { $set: { name, email, phone, favorite } })
  return newContact;
}

const updateStatusContact = async ({ id, favorite }) => {
  const contactToChange = await Contacts.findByIdAndUpdate(id, { $set: { favorite } })
  return contactToChange
  }

module.exports = {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  patchContact,
  updateStatusContact
}
