const contactsOperations = require('../model/contacts')

// Получение всех контактов
const getAllContacts = async (req, res, next) => {
  const contacts = await contactsOperations.listContacts()

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts
    }
  })
}

// Получение контакта по id
const getContactsById = async (req, res, next) => {
  try {
    const contact = await contactsOperations.getContactById(req.params.contactId)

    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ contact, status: 'success' })
  } catch (error) {
    next(error)
  }
}

// Создание контакта
const addContacts = async (req, res, next) => {
  try {
    const contact = await contactsOperations.addContact(req.body)

    res.status(201).json({ contact, status: 'success' })
  } catch (error) {
    next(error)
  }
}

// Удаление контакта
const deleteContact = async (req, res, next) => {
  try {
    const result = await contactsOperations.removeContact(req.params.contactId)

    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
}

// Обновление контакта
const patchContact = async (req, res, next) => {
  try {
    const contact = await contactsOperations.updateContact(req.params.contactId, req.body)

    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ contact, status: 'success' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllContacts,
  getContactsById,
  addContacts,
  deleteContact,
  patchContact,
}
