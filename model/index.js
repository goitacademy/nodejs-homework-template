const { Contact } = require('../db/contactModel')

const listContacts = async (req, res) => {
  const contacts = await Contact.find({})
  return contacts
}

const getContactById = async contactId => {
  const contact = await Contact.findById(contactId)
  if (!contact) {
    return { message: 'No contact with such Id' }
  }
  return contact
}

const addContact = async body => {
  try {
    const { name, email, phone } = body
    const contact = new Contact({ name, email, phone })
    contact.save()
    return contact
  } catch (err) {
    console.error(err.message)
  }
}

const removeContact = async contactId => {
  await Contact.findByIdAndDelete(contactId)
}

const updateContact = async (contactId, body) => {
  const { favorite, name, email, phone } = body
  await Contact.findByIdAndUpdate(contactId, {
    $set: {
      favorite,
      name,
      email,
      phone,
    },
  })
  const contact = getContactById(contactId)
  return contact
}

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body
  await Contact.findByIdAndUpdate(contactId, { $set: { favorite } })
  const newContact = await getContactById(contactId)
  return newContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
