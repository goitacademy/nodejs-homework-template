const { validationResult } = require('express-validator')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatus,
} = require('./contacts.model.js')

const getContacts = async (req, res, next) => {
  res.status(200).json(await listContacts())
}

const getContactsById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await getContactById(contactId)

  contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: 'Not found' })
}

const createContact = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const newContact = await addContact(req.body)

  newContact
    ? res.status(201).json(newContact)
    : res.status(400).json({ message: 'missing required name field' })
}

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params
  const contactDeleted = await removeContact(contactId)

  contactDeleted
    ? res.status(200).json({ message: 'contact deleted' })
    : res.status(404).json({ message: 'Not found' })
}

const updateContactById = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: 'missing fields' })
  }

  const contactUpdated = await updateContact(req.params.contactId, req.body)

  contactUpdated
    ? res.status(200).json(contactUpdated)
    : res.status(404).json({ message: 'Not found' })
}

const updateStatusContact = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: 'missing fields' })
  }
  const contactUpdated = await updateStatus(req.params.contactId, req.body)

  contactUpdated
    ? res.status(200).json(contactUpdated)
    : res.status(404).json({ message: 'Not found' })
}

module.exports = {
  getContacts,
  getContactsById,
  createContact,
  deleteContactById,
  updateContactById,
  updateStatusContact,
}
