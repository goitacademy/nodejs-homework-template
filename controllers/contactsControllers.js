const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../model/index')

const getContactsController = async (req, res) => {
  const contacts = await getAllContacts()
  res.status(200).json({ contacts, status: 'success' })
}

const getContactByIdController = async (req, res) => {
  const contact = await getContactById(req.params.contactId)

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ contact, status: 'success' })
}

const addContactsController = async (req, res) => {
  const contact = await addContact(req.body)
  res.status(201).json({ contact, status: 'success' })
}

const updateContactController = async (req, res) => {
  const contact = await updateContact(req.params.contactId, req.body)

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ contact, status: 'success' })
}

const updateStatusContactController = async (req, res) => {
  const contact = await updateStatusContact(req.params.contactId, req.body)

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ contact, status: 'success' })
}

const deleteContactController = async (req, res) => {
  const result = await removeContact(req.params.contactId)

  if (!result) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ message: 'contact deleted' })
}

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactsController,
  updateContactController,
  updateStatusContactController,
  deleteContactController,
}
