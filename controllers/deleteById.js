const { NotFound } = require('http-errors')
const { removeContact } = require('../model/contacts')

const deleteById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await removeContact(contactId)
  if (!result) {
    throw new NotFound('Not found')
  }
  res.json({ status: 'success delete', code: 200, data: { result } })
}

module.exports = deleteById
