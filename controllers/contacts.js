const { NotFound } = require('http-errors')
const { sendSuccessRes } = require('../helpers')
const contactsOperations = require('../model/contacts')

const getAll = async (req, res) => {
  const result = await contactsOperations.listContacts()
  sendSuccessRes(res, { result })
}

const getById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.getContactById(contactId)

  if (!result) {
    throw new NotFound(`Contact ID${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const add = async (req, res) => {
  const result = await contactsOperations.addContact(req.body)
  sendSuccessRes(res, { result }, 201)
}

const updateById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.updateById(contactId, req.body)
  if (!result) {
    throw new NotFound(`Contact ID${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const removeById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.removeContact(contactId, req.body)

  if (!result) {
    throw new NotFound(`Contact ID${contactId} not found`)
  }
  sendSuccessRes(res, { message: 'Contact delete' })
}

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  removeById,
}
