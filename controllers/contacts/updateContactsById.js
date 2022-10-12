const contacts = require('../../models/contacts')

const { RequestError } = require('../../helpers')

const updateContactsById = async (req, res, next) => {
  const { id } = req.params
  const result = await contacts.updateContactsById(id, req.body)
  if (!result) {
    throw RequestError(404, 'Not found')
  }
  res.status(201).json(result)
}
module.exports = updateContactsById
