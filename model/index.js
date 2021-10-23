const { Contact } = require('./contact')

const listContacts = async () => {
  const data = await Contact.find({}, '_id name phone email favorite')
  return data
}

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(
      contactId,
      '_id name phone email favorite',
    )
    return contact
  } catch (error) {
    return null
  }
}

const removeContact = async (contactId) => {
  try {
    const contactToRemove = Contact.findByIdAndDelete(contactId)
    return contactToRemove
  } catch (error) {
    return null
  }
}

const addContact = async (body) => {
  const newContact = await Contact.create(body, '_id name phone email favorite')
  return newContact
}

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    })
    return updatedContact
  } catch (error) {
    return null
  }
}

const updateStatusContact = async (contactId, body) => {
  try {
    const { favorite } = body
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true },
    )
    return updatedContact
  } catch (error) {
    return null
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
