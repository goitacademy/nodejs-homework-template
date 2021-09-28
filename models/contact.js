const { Contact } = require('../schemas/contacts')

const getAllContacts = async (req) => {
  const { page = 1, limit = 20 } = req.query
  const skip = (page - 1) * limit
  const contacts = await Contact.find({ owner: req.user._id }, '', {
    skip,
    limit: +limit,
  }).populate('owner', '_id email')
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

const removeContact = async (req) => {
  const { contactId } = req.params

  const findOne = { _id: contactId, owner: req.user._id }
  const contact = await Contact.findByIdAndDelete(findOne)
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
