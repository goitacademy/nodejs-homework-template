const {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContact,
  updateStatusContact,
} = require('../services/contactsService')

const getContactsController = async (req, res) => {
  const contacts = await getContacts()

  res.json({ contacts })
}

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params

  const contact = await getContactById(contactId)

  res.json({ contact, status: 'success' })
}

const addContactController = async (req, res) => {
  const { name, email, phone } = req.body

  const contact = await addContact(name, email, phone)

  res.json({ contact, status: 'success' })
}

const changeContactController = async (req, res) => {
  const { name, email, phone } = req.body
  const { contactId } = req.params

  if (!req.body) {
    res.status(400).json({ message: 'missing fields' })
  }
  const contact = await changeContactById(contactId, {
    name,
    email,
    phone,
  })
  if (!contact) {
    res.status(404).json({ message: 'Not found' })
  }

  res.json({ contact, status: 'success' })
}

const updateStatusContactController = async (req, res) => {
  const { favorite } = req.body
  const { contactId } = req.params
  const contact = await updateStatusContact(contactId, favorite)
  res.json({ contact, status: 'success' })
}

const deleteContactController = async (req, res) => {
  const { contactId } = req.params

  await deleteContact(contactId)

  res.json({ status: 'success' })
}

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  changeContactController,
  updateStatusContactController,
  deleteContactController,
}
