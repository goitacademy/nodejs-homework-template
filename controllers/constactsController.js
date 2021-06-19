const Contacts = require('../services/contactsService')

const {
  addContactSchema,
  updateContactSchema,
  updateStatusContactSchema
} = require('../routes/api/validation')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    res.status(200).json({ contacts, status: 'success' })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  console.log(req.params)
  try {
    const contact = await Contacts.getContactById(contactId)
    if (contact) {
      return res.status(200).json({ contact, status: 'success' })
    }
    res.status(404).json({ message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  const { error } = addContactSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: 'missing required field' })
  }
  try {
    const contact = await Contacts.addContact(req.body)
    res.status(201).json({ contact, status: 'success' })
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const result = await Contacts.removeContact(contactId)

    if (result) {
      return res.status(200).json({ message: `contact ${contactId} deleted` })
    }
    res.status(404).json({ message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  const { contactId } = req.params
  const { body } = req
  const { error } = updateContactSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: 'missing fields' })
  }
  try {
    const contact = await Contacts.updateContact(contactId, body)

    if (contact) {
      return res.status(200).json({ contact, status: 'success' })
    }
    res.status(404).json({ message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params
  const { body } = req
  const { error } = updateStatusContactSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: 'missing field favorite' })
  }
  try {
    const contact = await Contacts.updateContact(contactId, body)

    if (contact) {
      return res.status(200).json({ contact, status: 'success' })
    }
    res.status(404).json({ message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact
}
