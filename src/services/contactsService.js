const { Contact } = require('../db/contactModel')
const { WrongParametersError } = require('../helpers/errors')

const getContacts = async () => {
  const contacts = await Contact.find({})
  return contacts
}
const getContactById = async contactId => {
  const contact = await Contact.findById(contactId)
  if (!contact) {
    throw new WrongParametersError(
      `Failure, no posts with id '${contactId}' found!`,
    )
  }
  return contact
}

const addContact = async (name, email, phone) => {
  const contact = new Contact({ name, email, phone })
  await contact.save()
  return contact
}

const changeContactById = async (contactId, { name, email, phone }) => {
  const contact = await Contact.findByIdAndUpdate(contactId, {
    $set: {
      name,
      email,
      phone,
    },
    omitUndefined: false,
  })

  return contact
}

const updateStatusContact = async (contactId, favorite) => {
  await Contact.findByIdAndUpdate(contactId, { $set: { favorite } })
  const newContact = await getContactById(contactId)
  return newContact
}

const deleteContact = async contactId => {
  await Contact.findById(contactId)
}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContact,
  updateStatusContact,
}
