const { v4: uuidv4 } = require('uuid')
const contactsRepo = require('../repositories/contacts')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsRepo.listContacts()
    res.json(contacts)
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsRepo.getContactById(req.params.id)
    if (contact) {
      res.json(contact)
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'missing required fields' })
  }

  const contact = { id: uuidv4(), name, email, phone }
  try {
    await contactsRepo.addContact(contact)
    res.status(201).json(contact)
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const result = await contactsRepo.removeContact(req.params.id)
    if (result) {
      res.json({ message: 'contact deleted' })
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  const { name, email, phone } = req.body
  if (!name && !email && !phone) {
    return res.status(400).json({ message: 'missing fields' })
  }

  try {
    const contact = await contactsRepo.updateContact(req.params.id, req.body)
    if (contact) {
      res.json(contact)
    } else {
      res.status(404).json({ message: 'Not found' })
    }
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
}
