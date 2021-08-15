const mongoose = require('mongoose')
const { Contact } = require('../db/contactModel')

const listContacts = async () => {
  try {
    const data = await Contact.find({})
    return data
  } catch (error) {
    return error
  }
}
const getContactById = async (contactId) => {
  try {
    if (mongoose.isValidObjectId(contactId)) {
      const contact = await Contact.findById(contactId)
      return contact
    }
  } catch (error) {
    return error
  }
}

const removeContact = async (contactId) => {
  try {
    if (mongoose.isValidObjectId(contactId)) {
      const contact = await Contact.findByIdAndRemove(contactId)
      return contact
    }
  } catch (error) {
    return error
  }
}

const addContact = async (body) => {
  try {
    const contact = new Contact({ ...body })
    await contact.save()
    return contact
  } catch (error) {
    return error
  }
}

const updateContact = async (contactId, body) => {
  try {
    if (mongoose.isValidObjectId(contactId)) {
      const contact = await Contact.findByIdAndUpdate(
        contactId,
        {
          $set: { ...body },
        },
        { new: true },
      )
      return contact
    }
  } catch (error) {
    return error
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}