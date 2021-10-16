const { NotFound } = require('http-errors')

const sendSuccessRes = require('../helpers/sendSuccessRes')
const contactsOperations = require('../model/index')

const listContacts = async(req, res) => {
  const contacts = await contactsOperations.listContacts()
  sendSuccessRes(res, { contacts })
}

const getContactById = async(req, res) => {
  const { id } = req.params
  const contact = await contactsOperations.getContactById(id)
  if (!contact) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSuccessRes(res, { contact })
}

const addContact = async(req, res) => {
  const contact = await contactsOperations.addContact(req.body)
  sendSuccessRes(res, { contact }, 201)
}

const updateContactById = async(req, res) => {
  const { id } = req.params
  const contact = await contactsOperations.updateContactById(id, req.body)
  if (!contact) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSuccessRes(res, { contact })
}

const removeContact = async(req, res, next) => {
  const { id } = req.params
  const contacts = await contactsOperations.removeContact(id)
  if (!contacts) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSuccessRes(res, { message: 'Success delete' })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact
}
