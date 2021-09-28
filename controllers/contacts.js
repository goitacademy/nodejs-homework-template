const { NotFound } = require('http-errors')

const contactsOperations = require('../model/contacts')

const listContacts = async (req, res, next) => {
  const contacts = await contactsOperations.listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts
    }
  })
}

const getContactById = async (req, res, next) => {
  const { id } = req.params
  const contact = await contactsOperations.getContactById(id)
  if (!contact) {
    throw new NotFound(`Contact with id = ${id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      contact
    }
  })
}

const addContact = async (req, res, next) => {
  const newContact = await contactsOperations.addContact(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      newContact
    }
  })
}

const removeContact = async (req, res, next) => {
  const { id } = req.params
  const result = await contactsOperations.removeContact(id)
  if (!result) {
    throw new NotFound(`Contact with id = ${id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Success delete'
  })
}

const updateById = async (req, res, next) => {
  const { id } = req.params
  const results = await contactsOperations.updateById(id, req.body)
  if (!results) {
    throw new NotFound(`Contact with id = ${id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      results
    }
  })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById
}
